// components/molecules/CameraSelect.tsx
import React, { useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import useFetch from "@/services/hooks/UseRequest";
import { Camera } from "@/services/types";

interface CameraSelectProps {
  selectedCameras: string[];
  onCameraChange: (event: SelectChangeEvent<string[]>) => void;
}

const CameraSelect: React.FC<CameraSelectProps> = ({
  selectedCameras,
  onCameraChange,
}) => {
  const {
    data: responseData,
    loading: cameraLoading,
    error: cameraError,
  } = useFetch<{ data: Camera[] }>("admin/cameras?_status=Active");

  const cameras = responseData?.data || [];

  if (cameraLoading) return <p>Loading cameras...</p>;
  if (cameraError) return <p>Error: {cameraError?.message}</p>;

  return (
    <FormControl fullWidth>
      <InputLabel id="camera-select-label">Cameras</InputLabel>
      <Select
        labelId="camera-select-label"
        id="camera-select"
        multiple
        value={selectedCameras}
        label="Cameras"
        onChange={onCameraChange}
        name="cc_camera_urls"
      >
        {cameras.map((camera) => (
          <MenuItem key={camera.id} value={camera.id}>
            {camera.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CameraSelect;
