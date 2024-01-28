import PropTypes from 'prop-types';

const AddressBlock = ({ docData }) => {
  return (
    <div className="grid grid-cols-two text-[2rem] gap-12">
      <div>
        <span className="font-bold">Straße: </span> {docData.role.address.street}
      </div>
      <div>
        <span className="font-bold">Hausnr: </span> {docData.role.address.houseNr}
      </div>
      <div>
        <span className="font-bold">Postleitzahl: </span> {docData.role.address.postalCode}
      </div>
      <div>
        <span className="font-bold">Stadt: </span> {docData.role.address.city}
      </div>
    </div>
  );
};

AddressBlock.propTypes = {
  docData: PropTypes.object,
};

export default AddressBlock;
