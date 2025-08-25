import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Typography,
  Button,
} from "@mui/material";

export default function PermissionsTable() {
  const allPermissions = [
    { id: 1, name: "Read" },
    { id: 2, name: "Write" },
    { id: 3, name: "Delete" },
  ];

  const allMenus = [
    { menuId: 1, menuDisplayName: "Dashboard", parentMenuId: 0 },
    { menuId: 2, menuDisplayName: "Settings", parentMenuId: 0 },
    { menuId: 3, menuDisplayName: "Profile", parentMenuId: 0 },
    { menuId: 4, menuDisplayName: "Overview", parentMenuId: 1 },
    { menuId: 5, menuDisplayName: "Report", parentMenuId: 1 },
    { menuId: 6, menuDisplayName: "Security", parentMenuId: 2 },
  ];

  const roleDetails = {
    menus: [
      { id: 3, permission: { id: 1 } },
      { id: 5, permission: { id: 2 } },
    ],
  };

  const [editMode, setEditMode] = useState(true);
  const [editablePermissions, setEditablePermissions] = useState({});

  const handlePermissionChange = (menuId, permissionId) => {
    setEditablePermissions((prev) => ({ ...prev, [menuId]: permissionId }));
  };

  // Helper: render permissions cells for a menu
  const renderPermissionCells = (menuId) =>
    allPermissions.map((permission) => (
      <TableCell key={`${menuId}-${permission.id}`} sx={{ width: "80px" }}>
        {editMode ? (
          <Checkbox
            checked={editablePermissions[menuId] === permission.id}
            onChange={() => handlePermissionChange(menuId, permission.id)}
            color="primary"
          />
        ) : (
          roleDetails?.menus.find((m) => m.id === menuId)?.permission?.id ===
            permission.id && (
            <Typography sx={{ color: "green", fontWeight: "bold" }}>✔️</Typography>
          )
        )}
      </TableCell>
    ));

  // Derived main menus
  const mainMenus = allMenus.filter((m) => m.parentMenuId === 0);

  return (
    <div>
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setEditMode((p) => !p)}>
        Toggle {editMode ? "View" : "Edit"} Mode
      </Button>

      <TableContainer component={Paper} sx={{ mt: 2, border: "1px solid #878787" }}>
        <Table size="small" sx={{ minWidth: "600px", width: "100%", tableLayout: "fixed" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#4d4d4d" }}>
              <TableCell sx={{ width: "200px", color: "white" }}>Main Menu</TableCell>
              <TableCell sx={{ width: "150px", color: "white" }}>SubMenu</TableCell>
              {allPermissions.map((p) => (
                <TableCell key={p.id} sx={{ width: "80px", color: "white" }}>
                  {p.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {mainMenus.map((mainMenu) => {
              const subMenus = allMenus.filter((m) => m.parentMenuId === mainMenu.menuId);

              if (subMenus.length > 0) {
                return subMenus.map((subMenu, idx) => (
                  <TableRow key={subMenu.menuId}>
                    {idx === 0 && (
                      <TableCell
                        rowSpan={subMenus.length}
                        sx={{ fontWeight: "medium", backgroundColor: "#eeeeee" }}
                      >
                        {mainMenu.menuDisplayName}
                      </TableCell>
                    )}
                    <TableCell>{subMenu.menuDisplayName}</TableCell>
                    {renderPermissionCells(subMenu.menuId)}
                  </TableRow>
                ));
              }

              return (
                <TableRow key={mainMenu.menuId}>
                  <TableCell sx={{ fontWeight: "medium", backgroundColor: "#eeeeee" }}>
                    {mainMenu.menuDisplayName}
                  </TableCell>
                  <TableCell></TableCell>
                  {renderPermissionCells(mainMenu.menuId)}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
