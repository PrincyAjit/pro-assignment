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
  Tooltip,
  Typography,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import clsx from 'clsx';

import ContentLoader from 'react-content-loader';
import { Alert, Button } from '@mui/material';

import CustomTextfield from '../components/CustomTextfield';
import CustomSelect from '../components/CustomSelect';
import CustomDialog from '../components/dialog/CustomDialog';
import DialogLoadingBody from '../components/dialog/DialogLoadingBody';
import DialogSuccessBody from '../components/dialog/DialogSuccessBody';
import DialogErrorBody from '../components/dialog/DialogErrorBody';

import {
  getAllProducts,
  addProduct,
  editProduct,
  deleteProduct,
} from '../api/endpoints/product';

import {
  isValidArray,
  isValidObject,
  isValidString,
  capitalizeFirstLetter,
} from '../utils/utilFunctions';
import { messages } from '../utils/constants';

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
  },
  addOrEditProductDivElement: {
    flex: 1,
  },
  buttonText: {
    fontWeight: '600 !important',
  },
  addProductButtonDiv: {},
  outerAddProductButton: {
    float: 'right',
    marginBottom: '16px !important',
  },
  tableContainer: {
    maxHeight: '500px',
    overflow: 'scroll',
  },
}));

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

const AddOrEditProduct = ({
  actionType,
  productEntry,
  setProductEntry,
  productNames,
  setActionLoading,
  setActionError,
  setActionCompleted,
}) => {
  const classes = useStyles();

  const activeDropdownData = ['Yes', 'No'];
  const initialNewProductInfo = {
    ProductName: '',
    Quantity: '',
    IsActive: 'Yes',
  };
  const isEditAction = actionType === 'edit';
  const [productDetails, setProductDetails] = useState({
    ...initialNewProductInfo,
  });
  const [productNameExists, setProductNameExists] = useState(false); // Added this validation since api does not allow same product names.
  const [enableAddProductButton, setEnableAddProductButton] = useState(false);

  const onProductDetailsChange = (id, value) => {
    if (id === 'ProductName') {
      const productNameExists = productNames.includes(value);
      setProductNameExists(productNameExists);
    }
    setProductDetails((prevDetails) => ({ ...prevDetails, [id]: value }));
  };

  const validateProductInfo = () => {
    const isValidProductName =
      isValidString(productDetails?.ProductName) && !productNameExists;
    if (!isValidProductName) {
      setEnableAddProductButton(false);
      return;
    }
    const isValidQuantity = productDetails?.Quantity > 0;
    if (!isValidQuantity) {
      setEnableAddProductButton(false);
      return;
    }
    const isValidActiveState = isValidString(productDetails?.IsActive);
    setEnableAddProductButton(isValidActiveState);
  };

  const onActionClick = () => {
    const apiToCall = isEditAction ? editProduct : addProduct;
    const apiData = {
      productName: productDetails?.ProductName,
      quantity: productDetails?.Quantity,
      isActive: productDetails?.IsActive === 'Yes',
    };
    if (isEditAction) apiData.productId = productEntry?.ProductId;
    console.log({ apiData });
    setActionLoading(true);
    apiToCall(apiData)
      .then((response) => {
        setProductEntry({ ...productDetails }); // setting back at parent level.
        setActionCompleted(true);
        setActionLoading(false);
      })
      .catch((error) => {
        setActionError(true);
        setActionLoading(false);
      });
  };

  useEffect(() => {
    console.log({ productDetails });
    validateProductInfo();
  }, [productDetails]);

  useEffect(() => {
    console.log({ productEntry });
    if (isValidObject(productEntry))
      setProductDetails({
        ...productEntry,
        IsActive: productEntry?.IsActive ? 'Yes' : 'No',
      });
  }, [productEntry]);

  return (
    <div className={classes.addOrEditProductDiv}>
      <CustomTextfield
        id="ProductName"
        label="product name"
        onChange={onProductDetailsChange}
        value={productDetails?.ProductName}
        customClasses={{ root: classes.addOrEditProductDivElement }}
        customErrorMessage={
          productNameExists ? messages.UNIQUE_PRODUCT_NAME : ''
        }
      />
      <CustomTextfield
        id="Quantity"
        label="quantity"
        type="number"
        value={productDetails?.Quantity}
        onChange={onProductDetailsChange}
        inputProps={{ min: 0 }}
        customClasses={{ root: classes.addOrEditProductDivElement }}
      />
      <CustomSelect
        id="IsActive"
        label="is active"
        data={activeDropdownData}
        value={productDetails?.IsActive}
        onChange={onProductDetailsChange}
        customClasses={{ root: classes.addOrEditProductDivElement }}
      />
      <Tooltip
        title={!enableAddProductButton ? 'Enter all product details.' : null}
      >
        {/* Added extra div as tooltip does not work as expected directly on buttons */}
        <div className={classes.addProductButtonDiv}>
          <Button
            variant="contained"
            className={clsx([classes.buttonText, classes.addProductButton])}
            disabled={!enableAddProductButton}
            onClick={onActionClick}
          >
            {isEditAction ? 'Edit' : 'Add'} Product
          </Button>
        </div>
      </Tooltip>
    </div>
  );
};

const DeleteProduct = ({
  productEntry,
  setActionLoading,
  setActionError,
  setActionCompleted,
  onCloseActionDialog,
}) => {
  const onDeleteProduct = () => {
    setActionLoading(true);
    deleteProduct({ productId: productEntry?.ProductId })
      .then((response) => {
        setActionCompleted(true);
        setActionLoading(false);
      })
      .catch((error) => {
        console.log('delete error', { error });
        setActionError(true);
        setActionLoading(false);
      });
  };
  return (
    <div>
      <h4>
        Are you sure you want to delete <b>{productEntry?.ProductName}</b> ?
      </h4>
      <div>
        <Button onClick={onCloseActionDialog}>No</Button>
        <Button onClick={onDeleteProduct}>Yes</Button>
      </div>
    </div>
  );
};

const ActionDialog = ({
  actionDialogOpen,
  actionType,
  onCloseActionDialog,
  actionProductData,
  setActionProductData,
  productNames,
  onActionSuccess,
}) => {
  const isDeleteAction = actionType === 'delete';

  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(false);
  const [actionCompleted, setActionCompleted] = useState(false);

  const Title = () => {
    return (
      <Typography variant="h5">
        {actionLoading || actionError || actionCompleted ? (
          <>
            {actionLoading && 'Action in progress'}
            {actionError && 'Error'}
            {actionCompleted && 'Changes Saved'}
          </>
        ) : (
          <>{capitalizeFirstLetter(actionType)} Product</>
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
              setActionLoading={setActionLoading}
              setActionError={setActionError}
              setActionCompleted={setActionCompleted}
              onCloseActionDialog={onCloseActionDialog}
            />
          ) : (
            <AddOrEditProduct
              actionType={actionType}
              productEntry={actionProductData}
              setProductEntry={setActionProductData}
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
    if (actionCompleted) onActionSuccess();
  }, [actionCompleted]);

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
  const classes = useStyles();

  const columns = ['Product Name', 'Quantity', 'Is Active', 'Edit', 'Delete'];

  let [rowData, setRowData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState(false);

  const [productNames, setProductNames] = useState([]);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState('');
  const [actionProductData, setActionProductData] = useState({});

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

  const onActionSuccess = () => {
    if (actionType === 'edit') {
      rowData = rowData.map((entry) =>
        entry?.ProductId === actionProductData?.ProductId
          ? { ...entry, ...actionProductData }
          : entry
      );
    } else if (actionType === 'add') rowData.unshift({ ...actionProductData });
    else {
      rowData = rowData.filter(
        (entry) => entry?.ProductId !== actionProductData?.ProductId
      );
    }

    setRowData(rowData);
  };

  useEffect(() => {
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
  }, []);

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
                            <StyledTableCell className={classes.columnName}>
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
        actionType={actionType}
        onCloseActionDialog={onCloseActionDialog}
        actionProductData={actionProductData}
        setActionProductData={setActionProductData}
        productNames={productNames}
        onActionSuccess={onActionSuccess}
      />
    </div>
  );
};

export default Homepage;
