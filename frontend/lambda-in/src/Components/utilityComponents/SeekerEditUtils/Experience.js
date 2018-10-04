import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DropDown from '../DropDown/DropDown';
import StateCapsule from '../StateCapsule/StateCapsule';
import MapDropDown from '../MapArrays/MapDropDown';

// eslint-disable-next-line arrow-parens
const Experience = (props) => {
  const { userInfo } = props;

  const field = 'experience';
  const itemType = 'object';
  const schema = {
    title: 'Title',
    company: 'Company',
    location: 'Location',
    headline: 'Head line',
    description: 'Description',
    startYear: 'Start year',
    endYear: 'End year',
  };
  const propsAndLabels = Object.entries(schema);

  return (
    <DropDown header="Experience">
      <DropDown header="Add new experience">
        <StateCapsule schema={schema} object={{}}>
          {({ stateCapsule, createItem }) => (
            <Fragment>
              <Button
                variant="outlined"
                color="primary"
                align="center"
                onClick={createItem(field)}
              >
                Create
              </Button>
              {propsAndLabels.map((propLabel, index) => (
                <div className="inputFieldLargeMultiline">
                  <TextField
                    id={`new-${propLabel[0]}`}
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
                      'data-property': propLabel[0],
                      'data-value': stateCapsule[propLabel[0]],
                    }}
                  />
                </div>
              ))}
            </Fragment>
          )}
        </StateCapsule>
      </DropDown>
      <MapDropDown
        array={userInfo[field]}
        field={field}
        itemType={itemType}
        schema={schema}
        propsAndLabels={propsAndLabels}
      />
    </DropDown>
  );
};

export default Experience;
