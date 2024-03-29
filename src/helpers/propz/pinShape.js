import PropTypes from 'prop-types';

const pinShape = PropTypes.shape({
  boardId: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { pinShape };
