import { Chip } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import {
  VIDEO_STATE_PENDING,
  VIDEO_STATE_ACCEPTED,
  VIDEO_STATE_CONVERTED,
  VIDEO_STATE_BLOCKED,
  VIDEO_STATES_TITLES,
} from 'utils/constants';
import { VideosTableWrapper } from './styles';

const VIDEO_STATE_COLORS = {
  [VIDEO_STATE_PENDING]: 'default',
  [VIDEO_STATE_ACCEPTED]: 'primary',
  [VIDEO_STATE_CONVERTED]: 'primary',
  [VIDEO_STATE_BLOCKED]: 'secondary',
};

const columns = [
  { name: 'id', title: 'کد' },
  { name: 'title', title: 'عنوان' },
  { key: 'username', name: 'user', title: 'نام کاربر', cast: v => v.name },
  { key: 'channel', name: 'user', title: 'کانال', cast: v => v.channel.name },
  {
    name: 'category',
    title: 'دسته بندی',
    cast: v => (v && v.title ? v.title : 'نامشخص'),
  },
  { name: 'created_at', title: 'تاریخ ثبت نام', dir: 'ltr', cast: v => v },
  {
    name: 'state',
    title: 'وضعیت',
    cast: v => (
      <Chip label={VIDEO_STATES_TITLES[v]} color={VIDEO_STATE_COLORS[v]} />
    ),
  },
];

// eslint-disable-next-line no-unused-vars
function VideosTable({ videos, page, size, total, onChangePage, onRowClick }) {
  function handleChangePage(e, newPage) {
    onChangePage(newPage + 1, size);
  }

  function handleChangeRowsPerPage(e) {
    onChangePage(1, parseInt(e.target.value, 10));
  }

  return (
    <VideosTableWrapper>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.key || column.name}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {videos.map(video => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={Math.random()}
                onClick={() => onRowClick(video)}
              >
                {columns.map(column => {
                  const value = video[column.name];
                  return (
                    <TableCell
                      key={column.key || column.name}
                      align={column.align}
                      dir={column.dir}
                    >
                      {column.cast ? column.cast(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={total}
        rowsPerPage={size}
        page={page - 1}
        labelRowsPerPage=""
        labelDisplayedRows={() => `صفحه ${page}`}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </VideosTableWrapper>
  );
}

VideosTable.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
};

export default memo(VideosTable);
