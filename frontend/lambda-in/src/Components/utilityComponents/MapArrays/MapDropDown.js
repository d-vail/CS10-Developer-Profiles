import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DropDown from '../DropDown/DropDown';
import StateCapsule from '../StateCapsule/StateCapsule';

const MapDropDown = (props) => {
  const { isProfile, array, field, itemType, schema, propsAndLabels } = props;

  const renderForm = array.map((item, index) => (
    <DropDown
      header={item.title || item.degree}
      key={`${item.title || item.degree}${Math.random()}`}
    >
      <StateCapsule schema={schema} object={item}>
        {({ stateCapsule, removeItem }) => (
          <div className="dropdown-item-list blur-handler">
            <Fragment>
              <Button
                variant="outlined"
                color="primary"
                align="center"
                onClick={removeItem(field, index)}
              >
                delete
              </Button>
              {propsAndLabels.map((propLabel, propIndex) => (
                <div
                  className="inputFieldLargeMultiline"
                  key={`${Math.random()}-${propIndex}`}
                >
                  <TextField
                    id={`edit-${propLabel[0]}`}
                    label={propLabel[1]}
                    fullWidth
                    multiline
                    rowsMax="20"
                    value={stateCapsule[propLabel[0]]}
                    margin="normal"
                    variant="outlined"
                    inputProps={{
                      'data-field': field,
                      'data-itemtype': itemType,
                      'data-index': index,
                      'data-property': propLabel[0],
                      'data-value': stateCapsule[propLabel[0]],
                    }}
                  />
                </div>
              ))}
            </Fragment>
          </div>
        )}
      </StateCapsule>
    </DropDown>
  ));

  const renderProfile = array.map((item, index) => (
    <DropDown
      header={item.title || item.degree}
      key={`${item.title || item.degree}${Math.random()}`}
    >
      <div className="dropdown-item-list blur-handler">
        <Fragment>
          {propsAndLabels.map((propLabel, propIndex) => (
            <div
              className="inputFieldLargeMultiline"
              key={`${Math.random()}-${propIndex}`}
            >
              <div>
                <Typography variant="caption">{propLabel[1]}</Typography>
                <Typography variant="subheading">
                  {item[propLabel[0]]}
                </Typography>
              </div>
            </div>
          ))}
        </Fragment>
      </div>
    </DropDown>
  ));

  return isProfile ? renderProfile : renderForm;
};

export default MapDropDown;
