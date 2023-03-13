import "./App.css";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  TextField,
  Tooltip,
  ClickAwayListener,
} from "@mui/material";

export default function App() {
  const [tooltip, setTooltip] = useState(false);
  const [vals, setVals] = useState({
    minViewWidthPx: 1280,
    maxViewWidthPx: 1920,
    minElSizePx: 0,
    maxElSizePx: 0,
  });
  const [clamp, setClamp] = useState("");

  const clampBuilder = () => {
    const root = document.querySelector("html");
    const pixelsPerRem = Number(getComputedStyle(root).fontSize.slice(0, -2));

    const minViewWidth = parseFloat(vals.minViewWidthPx) / pixelsPerRem;
    const maxViewWidth = parseFloat(vals.maxViewWidthPx) / pixelsPerRem;
    const minElWidth = parseFloat(vals.minElSizePx) / pixelsPerRem;
    const maxElWidth = parseFloat(vals.maxElSizePx) / pixelsPerRem;

    const slope = (maxElWidth - minElWidth) / (maxViewWidth - minViewWidth);
    const yAxisIntersection = -minViewWidth * slope + minElWidth;

    setClamp(
      `clamp(${minElWidth.toFixed(3)}rem, ${yAxisIntersection.toFixed(3)}rem + ${Number(
        slope * 100
      ).toFixed(3)}vw, ${maxElWidth}rem);`
    );
  };

  const copyClamp = () => {
    setTooltip(false);

    setTimeout(() => {
      navigator.clipboard.writeText(clamp);
      setTooltip(true);
    }, 250);
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <TextField
            id="minViewWidthPx"
            label="Minimum Viewport Width (px)"
            variant="outlined"
            type="number"
            value={vals.minViewWidthPx}
            fullWidth
            required
            onChange={(e) => {
              setVals({
                ...vals,
                minViewWidthPx: e.target.value,
              });
            }}
          />
          <TextField
            sx={{ marginTop: "20px" }}
            id="maxViewWidthPx"
            label="Maximum Viewport Width (px)"
            variant="outlined"
            type="number"
            value={vals.maxViewWidthPx}
            fullWidth
            required
            onChange={(e) => {
              setVals({
                ...vals,
                maxViewWidthPx: e.target.value,
              });
            }}
          />
          <TextField
            sx={{ marginTop: "20px" }}
            id="minElSizePx"
            label="Minimum Element Size (px)"
            variant="outlined"
            type="number"
            value={vals.minElSizePx}
            fullWidth
            required
            onChange={(e) => {
              setVals({
                ...vals,
                minElSizePx: e.target.value,
              });
            }}
          />
          <TextField
            sx={{ marginTop: "20px" }}
            id="maxElSizePx"
            label="Maximum Element Size (px)"
            variant="outlined"
            type="number"
            value={vals.maxElSizePx}
            fullWidth
            required
            onChange={(e) => {
              setVals({
                ...vals,
                maxElSizePx: e.target.value,
              });
            }}
          />
        </CardContent>
        <CardActions>
          <Button onClick={clampBuilder} variant="contained">
            Calculate
          </Button>
          <Button
            onClick={() =>
              setVals({
                minViewWidthPx: 0,
                maxViewWidthPx: 0,
                minElSizePx: 0,
                maxElSizePx: 0,
              })
            }
            variant="contained"
            color="secondary"
          >
            Clear
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ marginTop: "20px" }}>
        <CardContent>
          <strong>CLAMP:</strong> {clamp}
        </CardContent>
        <CardActions>
          <ClickAwayListener onClickAway={() => setTooltip(false)}>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              open={tooltip}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title="Copied to clipboard!"
            >
              <Button variant="contained" color="primary" onClick={copyClamp}>
                COPY
              </Button>
            </Tooltip>
          </ClickAwayListener>
        </CardActions>
      </Card>
    </Container>
  );
}
