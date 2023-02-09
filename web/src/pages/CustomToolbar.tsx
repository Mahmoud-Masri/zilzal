import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid-premium'
import * as React from 'react';

export function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
