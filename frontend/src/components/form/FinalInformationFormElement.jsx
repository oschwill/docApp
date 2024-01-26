import PropTypes from 'prop-types';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { getData } from '../../utils/fetchData';
import ErrorToolTip from '../error/ErrorToolTip';

const FinalInformationFormElement = ({
  userType,
  formData,
  onHandleChangeFormData,
  refresh,
  hasSuccessMessage,
}) => {
  const [expertiseAreas, setExpertiseAreas] = useState([]);

  useEffect(() => {
    if (userType === 'doctor') {
      fetchData();
    }

    async function fetchData() {
      const areaData = await getData('/api/v1/doc-info/get-all-areas');
      setExpertiseAreas(() =>
        areaData.data.allAreas.map((items) => {
          return {
            value: items._id,
            label: items.areaName,
          };
        })
      );
    }
  }, [userType]);

  return (
    <fieldset className="p-2">
      <legend>Geben Sie noch abschließende Informationen ein :</legend>
      {/* ALTER / TELEFONNUMER */}
      <div className="flex flex-col gap-2">
        {userType === 'patient' && (
          <div className="p-2 grid grid-cols-authForm relative">
            <label htmlFor="age" className="pr-4">
              Alter<span className="text-red-600 text-[2rem] font-bold">*</span>:
            </label>
            <input
              type="number"
              id="age"
              name="age"
              className="border-2"
              value={formData.age}
              onChange={onHandleChangeFormData}
              disabled={hasSuccessMessage}
            />
            {formData.errors && formData.errors.age && (
              <ErrorToolTip errorMessage={formData.errors.age} refresh={refresh} />
            )}
          </div>
        )}
        <div className="p-2 grid grid-cols-authForm relative">
          <label htmlFor="phone" className="pr-4">
            Telefonnr<span className="text-red-600 text-[2rem] font-bold">*</span>:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="border-2"
            value={formData.phone}
            onChange={onHandleChangeFormData}
            disabled={hasSuccessMessage}
          />
          {formData.errors && formData.errors.phone && (
            <ErrorToolTip errorMessage={formData.errors.phone} refresh={refresh} />
          )}
        </div>
      </div>
      {/*  / GESCHLECHT */}
      <div className="flex flex-col gap-2">
        <div className="p-2 grid grid-cols-authForm relative">
          <label htmlFor="gender" className="pr-4">
            Geschlecht<span className="text-red-600 text-[2rem] font-bold">*</span>:
          </label>
          <select
            name="gender"
            id="gender"
            className="border-2"
            value={formData.gender}
            onChange={onHandleChangeFormData}
            disabled={hasSuccessMessage}
          >
            <option value="">Bitte auswählen</option>
            <option value="male">Männlich</option>
            <option value="female">Weiblich</option>
            <option value="divers">Divers</option>
          </select>
          {formData.errors && formData.errors.gender && (
            <ErrorToolTip errorMessage={formData.errors.gender} refresh={refresh} />
          )}
        </div>
        {userType === 'doctor' && (
          <>
            <div className="p-2 grid grid-cols-authForm relative">
              <label htmlFor="numberOfPatients" className="pr-4">
                Patienten:
              </label>
              <input
                type="number"
                id="numberOfPatients"
                name="numberOfPatients"
                className="border-2"
                value={formData.numberOfPatients}
                onChange={onHandleChangeFormData}
                disabled={hasSuccessMessage}
              />
              {formData.errors && formData.errors.numberOfPatients && (
                <ErrorToolTip errorMessage={formData.errors.numberOfPatients} refresh={refresh} />
              )}
            </div>
            <div className="p-2 grid grid-cols-authForm relative">
              <label htmlFor="expertise" className="pr-4">
                Fachkentnisse<span className="text-red-600 text-[2rem] font-bold">*</span>:
              </label>
              <Select
                isMulti
                // value={formData.expertise}
                onChange={onHandleChangeFormData}
                options={expertiseAreas}
                name="expertise"
                placeholder="Bitte auswählen"
                isDisabled={hasSuccessMessage}
              />
              {formData.errors && formData.errors.expertise && (
                <ErrorToolTip errorMessage={formData.errors.expertise} refresh={refresh} />
              )}
            </div>
            <div className="p-2 grid grid-cols-authForm">
              <label htmlFor="description" className="pr-4">
                Beschreibung:
              </label>
              <textarea
                name="description"
                className="border-2"
                cols="30"
                rows="5"
                value={formData.description}
                onChange={onHandleChangeFormData}
                disabled={hasSuccessMessage}
              ></textarea>
            </div>
          </>
        )}
      </div>
    </fieldset>
  );
};

FinalInformationFormElement.propTypes = {
  userType: PropTypes.string,
  formData: PropTypes.object,
  onHandleChangeFormData: PropTypes.func,
  refresh: PropTypes.string,
  hasSuccessMessage: PropTypes.bool,
};

export default FinalInformationFormElement;
