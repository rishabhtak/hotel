import PropTypes from 'prop-types';
// @mui
import { Box, Collapse, Table, TableRow, TableCell, TableHead, TableSortLabel, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

UserListHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  collapse: PropTypes.array,
  openCollapse: PropTypes.bool,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
};

export default function UserListHead({
  order,
  orderBy,
  rowCount,
  headLabel,
  openCollapse,
  numSelected,
  onRequestSort,
  onSelectAllClick,
  collapse
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell />
          {headLabel.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.alignRight ? 'right' : 'left'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                hideSortIcon
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      {/*
      <TableHead>
      <TableRow>
          {collapse.map((collapseCell) => (
            <TableCell
              key={collapseCell.id}
              style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}
              align={collapseCell.alignRight ? 'right' : 'left'}
            >
              <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>{collapseCell.label}</TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      */}
    </>
  );
}
