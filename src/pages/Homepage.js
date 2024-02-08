// #region Imports
// #region Library imports
import { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import clsx from 'clsx';
import ContentLoader from 'react-content-loader';
import { Alert, Button } from '@mui/material';
// #endregion Library imports

// #region Custom/User defined components imports
import CustomDialog from '../components/dialog/CustomDialog';
import DialogLoadingBody from '../components/dialog/DialogLoadingBody';
import DialogSuccessBody from '../components/dialog/DialogSuccessBody';
import DialogErrorBody from '../components/dialog/DialogErrorBody';
import { AddOrEditProduct, DeleteProduct } from '../components/ProductActions';
// #endregion Custom/User defined components imports

// #region api imports
import { getAllProducts } from '../api/endpoints/product';
// #endregion api imports

// #region utilities imports
import { isValidArray } from '../utils/utilFunctions';
import { messages } from '../utils/constants';
// #endregion utilities imports
// #endregion Imports

// #region Styling
const useStyles = createUseStyles((theme) => ({
  container: {
    padding: '24px',
    height: '100vh',
  },
  addOrEditProductDiv: {
    border: `1px solid ${theme.palette.border.main}`,
    padding: '24px',
    marginBottom: '24px',
    display: 'flex',
    columnGap: '24px',
    flexWrap: 'wrap',
  },
  addOrEditProductDivElement: {
    flex: 1,
  },
  buttonText: {
    fontWeight: '600 !important',
  },
  addProductButtonDiv: {
    textAlign: 'center',
  },
  outerAddProductButton: {
    float: 'right',
    marginBottom: '16px !important',
  },
  tableContainer: {
    maxHeight: '500px',
    overflow: 'scroll',
  },
  actionDialogTitle: {
    fontWeight: '600 !important',
  },
  actionName: {
    textTransform: 'capitalize',
  },
}));
// #endregion Styling

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.h5.fontWeight,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.body1.fontWeight,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ActionDialog = ({
  actionDialogOpen,
  onCloseActionDialog,
  actionType,
  actionProductData,
  productNames,
  onActionSuccess,
}) => {
  const isDeleteAction = actionType === 'delete';

  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(false);
  const [actionCompleted, setActionCompleted] = useState(false);

  const Title = () => {
    const classes = useStyles();
    return (
      <Typography
        variant="h6"
        component="span"
        className={classes.actionDialogTitle}
      >
        {actionLoading || actionError || actionCompleted ? (
          <>
            {actionLoading && 'Action in progress'}
            {actionError && 'Error'}
            {actionCompleted && 'Changes Saved'}
          </>
        ) : (
          <>
            <span className={classes.actionName}>{actionType}</span> Product
          </>
        )}
      </Typography>
    );
  };

  const DialogBody = () => {
    if (actionLoading) return <DialogLoadingBody />;
    else if (actionCompleted)
      return (
        <DialogSuccessBody
          content={{
            title: `You have ${actionType}ed the product successfully.`,
          }}
        />
      );
    else if (actionError)
      return (
        <DialogErrorBody
          content={{ title: messages.GENERIC_ERROR_MESSAGE, desc: '' }}
        />
      );
    else
      return (
        <>
          {isDeleteAction ? (
            <DeleteProduct
              productEntry={actionProductData}
              onActionSuccess={onActionSuccess}
              setActionLoading={setActionLoading}
              setActionError={setActionError}
              setActionCompleted={setActionCompleted}
              onCloseActionDialog={onCloseActionDialog}
            />
          ) : (
            <AddOrEditProduct
              actionType={actionType}
              productEntry={actionProductData}
              onActionSuccess={onActionSuccess}
              productNames={productNames}
              setActionLoading={setActionLoading}
              setActionError={setActionError}
              setActionCompleted={setActionCompleted}
            />
          )}
        </>
      );
  };

  useEffect(() => {
    if (actionDialogOpen) {
      // setting back to defaults.
      setActionLoading(false);
      setActionError(false);
      setActionCompleted(false);
    }
  }, [actionDialogOpen]);

  return (
    <CustomDialog
      open={actionDialogOpen}
      onDialogClose={onCloseActionDialog}
      noCloseAction={actionLoading}
      title={<Title />}
      content={<DialogBody />}
    />
  );
};

const Homepage = () => {
  // #region library based variables and data constants.
  const classes = useStyles();
  const columns = ['Product Name', 'Quantity', 'Is Active', 'Edit', 'Delete'];
  // #endregion library based variables and data constants.

  // #region state declarations.
  let [rowData, setRowData] = useState([]);
  let [productNames, setProductNames] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState('');
  const [actionProductData, setActionProductData] = useState({});
  // #endregion state declarations.

  // #region function declarations.
  const onProductActionClick = (actionType, actionData) => {
    setActionType(actionType);
    setActionProductData(actionData);
    setActionDialogOpen(true);
  };

  const onCloseActionDialog = () => {
    setActionType('');
    setActionProductData({});
    setActionDialogOpen(false);
  };

  const onActionSuccess = (updatedProductEntry) => {
    let updatedRowData = [...rowData];
    let updatedProductNames = [...productNames];
    if (actionType === 'edit') {
      updatedRowData = updatedRowData.map((entry) =>
        entry?.ProductId === updatedProductEntry?.ProductId
          ? { ...entry, ...updatedProductEntry }
          : entry
      );
      updatedProductNames = updatedProductNames?.filter(
        (productName) => productName !== actionProductData?.ProductName
      );
      updatedProductNames.push(updatedProductEntry?.ProductName);
    } else if (actionType === 'delete') {
      updatedRowData = updatedRowData.filter(
        (entry) => entry?.ProductId !== actionProductData?.ProductId
      );
      updatedProductNames = updatedProductNames?.filter(
        (productName) => productName !== actionProductData?.ProductName
      );
    } else {
      setRefetch((prevState) => !prevState); // Since we need productID to edit or delete, we do a refetch in case of add action.
    }

    setRowData(updatedRowData);
    setProductNames(updatedProductNames);
  };
  // #endregion function declarations.

  useEffect(() => {
    setDataLoading(true);
    getAllProducts()
      .then((response) => {
        if (isValidArray(response)) {
          setRowData(response);
          const productNames = response.map(
            (productEntry) => productEntry.ProductName
          );
          setProductNames(productNames);
        }

        setDataLoading(false);
      })
      .catch((error) => {
        setDataError(true);
        setDataLoading(false);
      });
  }, [refetch]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">Welcome Admin!</Typography>

      <>
        {dataLoading ? (
          <ContentLoader height={'100%'} width={'100%'}>
            <rect x="0" y="0" rx="5" ry="5" width="100%" height="6%" />
            <rect x="0" y="80" rx="4" ry="4" width="100%" height="84%" />
          </ContentLoader>
        ) : (
          <>
            {dataError ? (
              <Alert severity="info">{messages.GENERIC_ERROR_MESSAGE}</Alert>
            ) : (
              <>
                <Button
                  onClick={() => {
                    onProductActionClick('add');
                  }}
                  variant="contained"
                  className={clsx([
                    classes.outerAddProductButton,
                    classes.buttonText,
                  ])}
                >
                  Add Product
                </Button>
                {isValidArray(rowData) ? (
                  <TableContainer
                    component={Paper}
                    className={classes.tableContainer}
                  >
                    <Table
                      stickyHeader
                      sx={{ minWidth: 700 }}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <TableRow>
                          {columns.map((columnName) => (
                            <StyledTableCell
                              className={classes.columnName}
                              key={columnName}
                            >
                              {columnName}
                            </StyledTableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rowData.map((row) => (
                          <StyledTableRow key={row?.ProductId}>
                            <StyledTableCell component="th" scope="row">
                              {row?.ProductName}
                            </StyledTableCell>
                            <StyledTableCell>{row?.Quantity}</StyledTableCell>
                            <StyledTableCell>
                              {row?.IsActive ? 'Yes' : 'No'}
                            </StyledTableCell>
                            <StyledTableCell>
                              <Button
                                variant="contained"
                                className={classes.buttonText}
                                onClick={() => {
                                  onProductActionClick('edit', row);
                                }}
                              >
                                Edit
                              </Button>
                            </StyledTableCell>
                            <StyledTableCell>
                              <Button
                                variant="contained"
                                className={classes.buttonText}
                                onClick={() => {
                                  onProductActionClick('delete', row);
                                }}
                              >
                                Delete
                              </Button>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Alert severity="info">{messages.NO_PRODUCTS}</Alert>
                )}
              </>
            )}
          </>
        )}
      </>
      <ActionDialog
        actionDialogOpen={actionDialogOpen}
        onCloseActionDialog={onCloseActionDialog}
        actionType={actionType}
        actionProductData={actionProductData}
        productNames={productNames}
        onActionSuccess={onActionSuccess}
      />
    </div>
  );
};

export default Homepage;
