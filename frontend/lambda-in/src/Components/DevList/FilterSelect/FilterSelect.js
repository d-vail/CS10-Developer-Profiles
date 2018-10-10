import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = {
  chip: {
    margin: '4px',
  },
  filterSelect: {
    margin: '10px 0',
  },
  input: {
    display: 'flex',
    fontSize: '12px',
    fontWeight: 'lighter',
    padding: 0,
  },
  label: {
    color: '#333',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  paper: {
    position: 'absolute',
    zIndex: 2,
    left: 0,
    right: 0,
  },
  valueContainer: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    padding: '6px 0',
  },
};

class FilterSelect extends Component {
  static inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
  }

  static controlComponent(props) {
    const { inputComponent } = FilterSelect;
    const {
      selectProps, innerRef, children, innerProps,
    } = props;

    return (
      <TextField
        fullWidth
        InputProps={{
          inputComponent,
          inputProps: {
            className: selectProps.classes.input,
            inputRef: innerRef,
            children,
            ...innerProps,
          },
        }}
        {...selectProps.textFieldProps}
      />
    );
  }

  static menuComponent(props) {
    const { selectProps, innerProps, children } = props;

    return (
      <Paper square className={selectProps.classes.paper} {...innerProps}>
        {children}
      </Paper>
    );
  }

  static multiValueComponent(props) {
    const {
      children, selectProps, isFocused, removeProps,
    } = props;

    return (
      <Chip
        tabIndex={-1}
        label={children}
        className={classNames(selectProps.classes.chip, {
          [selectProps.classes.chipFocused]: isFocused,
        })}
        onDelete={removeProps.onClick}
        deleteIcon={<CancelIcon {...removeProps} />}
      />
    );
  }

  static optionComponent(props) {
    const {
      children, innerRef, innerProps, isFocused, isSelected,
    } = props;

    return (
      <MenuItem
        buttonRef={innerRef}
        selected={isFocused}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
        {...innerProps}
      >
        {children}
      </MenuItem>
    );
  }

  static valueContainerComponent(props) {
    const { selectProps, children } = props;
    return <div className={selectProps.classes.valueContainer}>{children}</div>;
  }

  handleChange(value) {
    const { filterName, onChange } = this.props;
    onChange(value, filterName);
  }

  render() {
    const {
      classes, placeholder, options, label, val,
    } = this.props;

    return (
      <div className={classes.filterSelect}>
        <Select
          classes={classes}
          textFieldProps={{
            label,
            InputLabelProps: {
              shrink: true,
              className: classes.label,
            },
          }}
          options={options}
          components={{
            Control: FilterSelect.controlComponent,
            Menu: FilterSelect.menuComponent,
            MultiValue: FilterSelect.multiValueComponent,
            Option: FilterSelect.optionComponent,
            ValueContainer: FilterSelect.valueContainerComponent,
          }}
          value={val}
          onChange={value => this.handleChange(value)}
          placeholder={placeholder}
          isMulti
        />
      </div>
    );
  }
}

FilterSelect.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  filterName: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

FilterSelect.defaultProps = {
  placeholder: '',
};

export default withStyles(styles)(FilterSelect);
