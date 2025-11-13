import {Component} from 'react'

import './index.css'

class Pagination extends Component {
  onClickPrevBtn = () => {
    const {apiCallBack, pageNo} = this.props

    if (pageNo > 1) {
      return apiCallBack(pageNo - 1)
    }
    return apiCallBack(pageNo)
  }

  onClickNextBtn = () => {
    const {apiCallBack, totalPages, pageNo} = this.props

    if (pageNo < totalPages) {
      return apiCallBack(pageNo + 1)
    }
    return apiCallBack(pageNo)
  }

  render() {
    const {pageNo} = this.props
    return (
      <div className="pagination-container">
        <button
          type="button"
          className="page-no-btn"
          onClick={this.onClickPrevBtn}
        >
          -
        </button>
        <h1 className="page-no-text">{pageNo}</h1>
        <button
          type="button"
          className="page-no-btn"
          onClick={this.onClickNextBtn}
        >
          +
        </button>
      </div>
    )
  }
}

export default Pagination
