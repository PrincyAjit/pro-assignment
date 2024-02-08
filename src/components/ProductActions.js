// #region Imports
// #region Library imports
import { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';
import { Tooltip, Button } from '@mui/material';
// #endregion Library imports

// #region Custom/User defined components imports
import CustomTextfield from './CustomTextfield';
// #endregion Custom/User defined components imports

// #region api imports
import {
  addProduct,
  editProduct,
  deleteProduct,
} from '../api/endpoints/product';
// #endregion api imports

// #region utilities imports
import { isValidObject, isValidString } from '../utils/utilFunctions';
import { messages } from '../utils/constants';
// #endregion utilities imports
// #endregion Imports

// #region Styling
const useStyles = createUseStyles((theme) => ({
  container: {
    padding: '24px',
    width: '629px',
  },
  addOrEditProductDiv: {
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
  deleteConfirmationText: {
    fontSize: '20px',
  },
  deleteDialogActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));
// #endregion Styling

export const AddOrEditProduct = ({
  actionType,
  productEntry,
  onActionSuccess,
  productNames,
  setActionLoading,
  setActionError,
  setActionCompleted,
}) => {
  // #region library based variables and data constants.
  const classes = useStyles();
  const initialNewProductInfo = {
    ProductName: '',
    Quantity: '',
  };
  const isEditAction = actionType === 'edit';
  // #endregion library based variables and data constants.

  // #region state declarations.
  const [productDetails, setProductDetails] = useState({
    ...initialNewProductInfo,
  });
  const [productNameExists, setProductNameExists] = useState(false); // Added this validation since api does not allow same product names.
  const [enableAddProductButton, setEnableAddProductButton] = useState(false);
  // #endregion state declarations.

  // #region function declarations.
  const onProductDetailsChange = (id, value) => {
    const isValueUnchanged = isEditAction
      ? value !== productEntry?.ProductName
      : true; // Only for edit case this needs to be checked.
    if (id === 'ProductName' && isValueUnchanged) {
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
    setEnableAddProductButton(isValidQuantity);
  };

  const onActionClick = () => {
    const apiToCall = isEditAction ? editProduct : addProduct;
    const apiData = {
      productName: productDetails?.ProductName,
      quantity: productDetails?.Quantity,
      isActive: true,
    };
    if (isEditAction) apiData.productId = productEntry?.ProductId;
    setActionLoading(true);
    apiToCall(apiData)
      .then((response) => {
        onActionSuccess({
          ...productDetails,
        }); // setting back at parent level.
        setActionCompleted(true);
        setActionLoading(false);
      })
      .catch((error) => {
        setActionError(true);
        setActionLoading(false);
      });
  };
  // #endregion function declarations.

  // #region useEffects.
  useEffect(() => {
    validateProductInfo();
  }, [productDetails]);

  useEffect(() => {
    if (isValidObject(productEntry))
      setProductDetails({
        ...productEntry,
      });
  }, [productEntry]);
  // #endregion useEffects.

  return (
    <div className={classes.container}>
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
          inputProps={{ min: 1 }}
          customClasses={{ root: classes.addOrEditProductDivElement }}
        />
      </div>

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

export const DeleteProduct = ({
  productEntry,
  onActionSuccess,
  setActionLoading,
  setActionError,
  setActionCompleted,
  onCloseActionDialog,
}) => {
  const classes = useStyles();

  const onDeleteProduct = () => {
    setActionLoading(true);
    deleteProduct({ productId: productEntry?.ProductId })
      .then((response) => {
        onActionSuccess();
        setActionCompleted(true);
        setActionLoading(false);
      })
      .catch((error) => {
        setActionError(true);
        setActionLoading(false);
      });
  };

  return (
    <div className={classes.container}>
      <p className={classes.deleteConfirmationText}>
        Are you sure you want to delete product -{' '}
        <b>{productEntry?.ProductName}</b> ?
      </p>
      <div className={classes.deleteDialogActions}>
        <Button onClick={onCloseActionDialog}>No</Button>
        <Button onClick={onDeleteProduct} variant="contained">
          Yes
        </Button>
      </div>
    </div>
  );
};
