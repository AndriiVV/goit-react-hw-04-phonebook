import styles from "./Filter.module.css"
import PropTypes from "prop-types";

const Filter = ({handleFilter}) => (
  <>
    <p className={styles.title}>Find contacts by Name</p>
    <input
      type="text"
      onChange={handleFilter}
      className={styles.input}
    />
  </>
)

Filter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
}

export default Filter;