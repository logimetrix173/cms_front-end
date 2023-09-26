import React, { useEffect, useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
} from "@material-ui/core";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import {
  nodes as initialNodes,
  edges as initialEdges,
} from "./initial-elements";
import MultiDropdown from "../../UI/MultiDropdown";
import MultiDropdownSingle from "../../UI/MultiDropdownSingle";
import axios from "axios";
import { SERVER_URL } from "../../../constants/constants";

const onInit = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

const checkValue = (value) => {
  if (value === -111) {
    return "N/A";
  } else {
    return value;
  }
};

const getNumber = (value, digit) => {
  const number = Number(value);
  return number % 1 !== 0 ? number.toFixed(digit) : number;
};

const getStrokeColor = (value) => {
  // console.log(value);
  if (value > 0) {
    // console.log("green");
    return "green";
  } else if (value <= 0) {
    return "red";
  } else {
    return "#000";
  }
};

const OverviewFlow = () => {
  const jwtToken = localStorage.getItem("userToken");

  const siteNamesAndBlocks = JSON.parse(
    localStorage.getItem("siteNamesAndBlocks")
  );
  const siteNamesValue = JSON.parse(localStorage.getItem("siteNamesAndBlocks"));

  // const getSite = () => {
  //   siteNamesAndBlocks.map((f, i) => {
  //     if (i === 33) {
  //       let val = f.name;
  //       console.log(val);
  //     }else if(i ===0)
  //   });
  // };
  // console.log(getSite());

  const [data, setData] = useState(null);

  const getNodesAndEdges = () => {
    let nodes = [];
    let edges = [];

    if (data) {
      let verticalCount = 1;

      const generation = {
        id: "generation",
        data: {
          label: (
            <>
              Generation (in MWH)
              <br />
              Instant: {checkValue(getNumber(data.instantGeneration, 3))}
              <br />
              Total: {checkValue(getNumber(data.totalGeneration, 3))}
            </>
          ),
        },
        position: { x: 0, y: 0 },
        targetPosition: "bottom",
        style: { background: "#03a9f4", color: "#fff", borderColor: "#03a9f4" },
      };

      nodes.push(generation);

      data.blocks.forEach((block) => {
        let blockValues = block.values;
        blockValues.forEach((inverter) => {
          let inverterNodeId = block.block + inverter.inverter;
          nodes.push({
            id: inverterNodeId,
            data: {
              label: (
                <>
                  {block.block}, {inverter.inverter}
                  <br />
                  DC I: {checkValue(getNumber(inverter.DC_I, 0))}, DC V:{" "}
                  {checkValue(getNumber(inverter.DC_V, 0))}
                </>
              ),
            },
            style: {
              background: "#4caf50",
              color: "#fff",
              borderColor: "#4caf50",
            },
            position: {
              x: Number(verticalCount * 200),
              y: 150,
            },
            sourcePosition: "top",
            targetPosition: "bottom",
          });

          let edgeId = `e1-${verticalCount}`;
          edges.push({
            id: edgeId,
            source: inverterNodeId,
            target: "generation",
            animated: true,
          });

          let edgeCount = 1;
          let stringYPos = 250;
          let stringSum = 0;
          inverter.inverter_strings.forEach((string, stringIndex) => {
            let stringNodeId = block.block + inverter.inverter + stringIndex;
            nodes.push({
              id: stringNodeId,
              data: {
                label: (
                  <>
                    {string.name}
                    <br />
                    {checkValue(getNumber(string.value, 2))}
                  </>
                ),
              },
              style: { background: "#ffeb3b", borderColor: "#ffeb3b" },
              position: {
                x: Number(verticalCount * 200),
                y: stringYPos,
              },
              sourcePosition: "top",
            });

            let edgeId = `e${verticalCount + 1}-${edgeCount}`;
            stringSum += Number(string.value);
            edges.push({
              id: edgeId,
              target: inverterNodeId,
              source: stringNodeId,
              animated: true,
              style: {
                stroke: getStrokeColor(stringSum),
              },
            });

            stringYPos += 100;
            edgeCount += 1;
          });

          verticalCount += 1;
        });
      });

      nodes[0].position = { x: Number((verticalCount * 200) / 2), y: 0 };
    }

    return { nodes, edges };
  };

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  const [selectedSite, setSelectedSite] = useState("Nangla");

  const getBlocks = (siteName = selectedSite) => {
    let sites = siteNamesAndBlocks.find((val) => val.name === siteName)
      ? siteNamesAndBlocks.filter((element) => element.name === siteName)
      : [siteNamesAndBlocks.splice(0, 1)[0]];
    // let sites = siteNamesAndBlocks.filter(
    //   (element) => element.name === siteName
    // );
    // let sites = siteNamesAndBlocks.filter((element) =>
    //   (element.name === siteName) !== "Nangla"
    //     ? siteNamesAndBlocks.map((f, i) => {
    //         if (i === 0) {
    //           return f.name;
    //         }
    //       })
    //     : siteName
    // );

    let numbers = Array.from({ length: sites[0].blocks[0] }, (_, i) => i + 1);
    return numbers.map((element) => "B" + String(element).padStart(2, "0"));
  };

  const [blocks, setBlocks] = useState(getBlocks());
  const [selectedBlocks, setSelectedBlocks] = useState(getBlocks());

  const handleBlocksChange = (event) => {
    let value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelectedBlocks(
        selectedBlocks.length === blocks.length ? [] : getBlocks()
      );
      return;
    }
    setSelectedBlocks(value.map((element) => element));
  };

  const handleSiteChange = (event) => {
    let value = event.target.value;
    setSelectedSite(value);
    setBlocks(getBlocks(value));
    setSelectedBlocks(getBlocks(value));
  };

  const fetchData = async () => {
    // console.log(selectedSite, selectedBlocks);
    try {
      const response = await axios.post(
        SERVER_URL + "/admin/sld/view",
        { site: selectedSite, block: selectedBlocks },
        {
          headers: {
            jwtToken: jwtToken,
          },
        }
      );
      const data = response.data;
      // console.log(data);
      // console.log(response);
      setData(data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const { nodes, edges } = getNodesAndEdges();
    setNodes(nodes);
    setEdges(edges);
  }, [data]);

  return (
    <Grid container style={{ height: "70vh" }}>
      <Grid
        container
        spacing={2}
        alignItems="flex-end"
        style={{ marginBottom: "1rem" }}
      >
        <Grid item>
          <FormControl>
            <InputLabel id="site-select-label">Site</InputLabel>
            <Select
              style={{ fontSize: ".8rem" }}
              labelId="site-select-label"
              id="site-select"
              value={selectedSite}
              onChange={handleSiteChange}
              // MenuProps={{
              //   classes: { paper: classes.menuPaper },
              //   getContentAnchorEl: () => null,
              // }}
            >
              {siteNamesValue.map((site) => (
                <MenuItem value={site.name}>{site.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <MultiDropdownSingle
            label="Blocks"
            items={blocks}
            selectedItems={selectedBlocks}
            handleChange={handleBlocksChange}
          />
        </Grid>
        <Grid item>
          <Button variant="outlined" size="small" onClick={fetchData}>
            View
          </Button>
        </Grid>
      </Grid>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        fitView
        nodesConnectable={false}
        nodesDraggable={false}
        attributionPosition="top-right"
      >
        <Controls showInteractive={false} />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </Grid>
  );
};

export default OverviewFlow;
