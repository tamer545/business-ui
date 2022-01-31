import '../App.css';
import {
    Container,
    LinearProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import {useEffect, useState} from "react";

function AuiList(props) {
    const columns = [
        {id: 'name', label: 'Name', minWidth: 170},
        {id: 'dateAdded', label: 'Date Added', minWidth: 100},
        {
            id: 'dateToDo',
            label: 'Date To Do',
            minWidth: 170,
        },
        {
            id: 'extraInfo',
            label: 'Extra Info',
            minWidth: 170,
        },
    ];

    const TableComponent = () => {
        const [page, setPage] = useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(10);

        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
        };

        useEffect(() => {
            props.setAuthenticated(true)
        })

        return (
            <Paper sx={{border: "2px solid black", width: '100%', overflow: 'hidden'}}>
                <TableContainer sx={{maxHeight: 440}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.loading ? (
                                <LinearProgress/>) : (props?.rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => {
                                return (
                                    <TableRow sx={idx % 2 === 0 ? {backgroundColor: "gray"} : {}} role="checkbox"
                                              tabIndex={-1}>
                                        {columns.map((column, index) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            }))}

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={props?.rows?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        )
    }

    return (
        <Container>
            <br/><br/>
            <TableComponent/>
        </Container>
    );
}

export default AuiList;