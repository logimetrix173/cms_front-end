import React from "react";
import { MarkerType } from "react-flow-renderer";

export const nodes = [
  {
    id: "instGen",
    data: {
      label: (
        <>
          Generation (in MWH)
          <br />
          Instant: 2, Total: 30
        </>
      ),
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "inv1",
    data: {
      label: "Inv 1",
    },
    position: { x: 0, y: 100 },
    sourcePosition: "right",
  },
  {
    id: "inv2",
    data: {
      label: "Inv 2",
    },
    position: { x: 0, y: 200 },
    sourcePosition: "right",
  },
  {
    id: "inv3",
    data: {
      label: "Inv 3",
    },
    position: { x: 0, y: 300 },
    sourcePosition: "right",
  },
  {
    id: "inv4",
    data: {
      label: "Inv 4",
    },
    position: { x: 0, y: 400 },
    sourcePosition: "right",
  },
  {
    id: "inv1Scb1",
    data: {
      label: "SCB Current 1",
    },
    position: { x: 200, y: 100 },
    targetPosition: "left",
    sourcePosition: "left",
  },
  {
    id: "inv1Scb2",
    data: {
      label: "SCB Current 2",
    },
    position: { x: 400, y: 100 },
    targetPosition: "left",
    sourcePosition: "left",
  },
  {
    id: "inv2Scb1",
    data: {
      label: "SCB Current 1",
    },
    position: { x: 200, y: 200 },
    targetPosition: "left",
    sourcePosition: "left",
  },
];

export const edges = [
  { id: "e1-1", source: "instGen", target: "inv1" },
  { id: "e1-2", source: "instGen", target: "inv2" },
  { id: "e1-3", source: "instGen", target: "inv3" },
  { id: "e1-3", source: "instGen", target: "inv4" },
  { id: "e2-1", source: "inv1", target: "inv1Scb1" },
  { id: "e2-2", source: "inv1", target: "inv1Scb2" },
  { id: "e3-1", source: "inv2", target: "inv2Scb1" },
];
