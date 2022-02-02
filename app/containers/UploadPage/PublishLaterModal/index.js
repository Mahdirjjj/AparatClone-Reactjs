import JalaliUtils from '@date-io/jalaali';
import { Button, DialogContent, DialogTitle } from '@material-ui/core';
import { CloseOutlined as CloseIcon } from '@material-ui/icons';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import jMoment from 'moment-jalaali';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import { compose } from 'redux';
import { PublishLaterModalWrapper } from './styles';

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: false });

function PublishLaterModal({ onClose, onOk }) {
  const [selectedDate, handleDateChange] = useState(moment().add(2, 'hours'));

  return (
    <PublishLaterModalWrapper open>
      <DialogTitle>
        <span>زمان انتشار را انتخاب کنید</span>
        <CloseIcon onClick={onClose} />
      </DialogTitle>
      <DialogContent>
        <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
          <DateTimePicker
            okLabel="تأیید"
            cancelLabel="لغو"
            disablePast
            labelFunc={date =>
              date ? date.format('jYYYY/jMM/jDD HH:mm:00') : ''
            }
            value={selectedDate}
            onChange={handleDateChange}
          />
        </MuiPickersUtilsProvider>
        <Button
          onClick={() => onOk(selectedDate.format('YYYY-MM-DD HH:mm:00'))}
        >
          تایید
        </Button>
      </DialogContent>
    </PublishLaterModalWrapper>
  );
}

PublishLaterModal.propTypes = {
  onOk: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default compose(memo)(PublishLaterModal);
