import PropTypes from 'prop-types';
import { createDayArray, createWorkingClockTime } from '../../utils/clockGenerator';
import ErrorToolTip from '../error/ErrorToolTip';

const AddressFormElement = ({
  userType,
  formData,
  onHandleChangeFormData,
  refresh,
  hasSuccessMessage,
}) => {
  return (
    <fieldset className="p-2">
      <legend>Geben Sie Ihre Adresse ein:</legend>
      {/* STRA?E / HAUSNUMMER */}
      <div className="flex flex-col gap-2">
        <div className="p-2 grid grid-cols-authForm relative">
          <label htmlFor="street" className="pr-4">
            Straße<span className="text-red-600 text-[2rem] font-bold">*</span>:
          </label>
          <input
            type="text"
            id="street"
            name="street"
            className="border-2"
            value={formData.street}
            onChange={onHandleChangeFormData}
            disabled={hasSuccessMessage}
          />
          {formData.errors && formData.errors.street && (
            <ErrorToolTip errorMessage={formData.errors.street} refresh={refresh} />
          )}
        </div>
        <div className="p-2 grid grid-cols-authForm relative">
          <label htmlFor="houseNr" className="pr-4">
            Hausnummer<span className="text-red-600 text-[2rem] font-bold">*</span>:
          </label>
          <input
            type="text"
            id="houseNr"
            name="houseNr"
            className="border-2"
            value={formData.houseNr}
            onChange={onHandleChangeFormData}
            disabled={hasSuccessMessage}
          />
          {formData.errors && formData.errors.houseNr && (
            <ErrorToolTip errorMessage={formData.errors.houseNr} refresh={refresh} />
          )}
        </div>
      </div>
      {/* PLZ / STADT */}
      <div className="flex flex-col gap-2">
        <div className="p-2 grid grid-cols-authForm relative">
          <label htmlFor="postalCode" className="pr-4">
            Postleitzahl<span className="text-red-600 text-[2rem] font-bold">*</span>:
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            className="border-2"
            value={formData.postalCode}
            onChange={onHandleChangeFormData}
            disabled={hasSuccessMessage}
          />
          {formData.errors && formData.errors.postalCode && (
            <ErrorToolTip errorMessage={formData.errors.postalCode} refresh={refresh} />
          )}
        </div>
        <div className="p-2 grid grid-cols-authForm relative">
          <label htmlFor="city" className="pr-4">
            Stadt<span className="text-red-600 text-[2rem] font-bold">*</span>:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="border-2"
            value={formData.city}
            onChange={onHandleChangeFormData}
            disabled={hasSuccessMessage}
          />
          {formData.errors && formData.errors.city && (
            <ErrorToolTip errorMessage={formData.errors.city} refresh={refresh} />
          )}
        </div>
        {/* ÖFFNUNGSZEITEN START */}
        {userType === 'doctor' && (
          <fieldset>
            <legend>
              Geben Sie Ihre Öffnungszeiten an
              <span className="text-red-600 text-[2rem] font-bold">*</span>:
            </legend>
            <div className="p-2 flex flex-wrap gap-4">
              <div className="flex flex-col ">
                <label htmlFor="workingTime" className="pr-4">
                  Start Wochentag<span className="text-red-600 text-[2rem] font-bold">*</span>:
                </label>
                <select
                  name="workingTimeStartDay"
                  id="workingTime"
                  className="border-2"
                  value={formData.workingTimeStartDay}
                  onChange={onHandleChangeFormData}
                  disabled={hasSuccessMessage}
                >
                  <option value="">Bitte auswählen</option>
                  {createDayArray().map((day) => {
                    return (
                      <option key={crypto.randomUUID()} value={day}>
                        {day}
                      </option>
                    );
                  })}
                </select>
                {formData.errors && formData.errors.workingTimeStartDay && (
                  <ErrorToolTip
                    errorMessage={formData.errors.workingTimeStartDay}
                    refresh={refresh}
                  />
                )}
              </div>
              <div className="flex flex-col relative">
                <label htmlFor="workingTime" className="pr-4">
                  End Wochentag<span className="text-red-600 text-[2rem] font-bold">*</span>:
                </label>
                <select
                  name="workingTimeEndDay"
                  id="workingTime"
                  className="border-2"
                  value={formData.workingTimeEndDay}
                  onChange={onHandleChangeFormData}
                  disabled={hasSuccessMessage}
                >
                  <option value="">Bitte auswählen</option>
                  {createDayArray().map((day) => {
                    return (
                      <option key={crypto.randomUUID()} value={day}>
                        {day}
                      </option>
                    );
                  })}
                </select>
                {formData.errors && formData.errors.workingTimeEndDay && (
                  <ErrorToolTip
                    errorMessage={formData.errors.workingTimeEndDay}
                    refresh={refresh}
                  />
                )}
              </div>
              <div className="flex flex-col relative">
                <label htmlFor="workingTime" className="pr-4">
                  Start Uhrzeit<span className="text-red-600 text-[2rem] font-bold">*</span>:
                </label>
                <select
                  name="workingTimeStartTime"
                  id="workingTime"
                  className="border-2"
                  value={formData.workingTimeStartTime}
                  onChange={onHandleChangeFormData}
                  disabled={hasSuccessMessage}
                >
                  <option value="">Bitte auswählen</option>
                  {createWorkingClockTime().map((clock) => {
                    return (
                      <option key={crypto.randomUUID()} value={clock}>
                        {clock}
                      </option>
                    );
                  })}
                </select>
                {formData.errors && formData.errors.workingTimeStartTime && (
                  <ErrorToolTip
                    errorMessage={formData.errors.workingTimeStartTime}
                    refresh={refresh}
                  />
                )}
              </div>
              <div className="flex flex-col relative">
                <label htmlFor="workingTime" className="pr-4">
                  End Uhrzeit<span className="text-red-600 text-[2rem] font-bold">*</span>:
                </label>
                <select
                  name="workingTimeEndTime"
                  id="workingTime"
                  className="border-2"
                  value={formData.workingTimeEndTime}
                  onChange={onHandleChangeFormData}
                  disabled={hasSuccessMessage}
                >
                  <option value="">Bitte auswählen</option>
                  {createWorkingClockTime().map((clock) => {
                    return (
                      <option key={crypto.randomUUID()} value={clock}>
                        {clock}
                      </option>
                    );
                  })}
                </select>
                {formData.errors && formData.errors.workingTimeEndTime && (
                  <ErrorToolTip
                    errorMessage={formData.errors.workingTimeEndTime}
                    refresh={refresh}
                  />
                )}
              </div>
            </div>
          </fieldset>
        )}
        {/* ÖFFNUNGSZEITEN END */}
      </div>
    </fieldset>
  );
};

AddressFormElement.propTypes = {
  userType: PropTypes.string,
  formData: PropTypes.object,
  onHandleChangeFormData: PropTypes.func,
  refresh: PropTypes.string,
  hasSuccessMessage: PropTypes.bool,
};

export default AddressFormElement;
