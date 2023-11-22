import React, { Component } from "react";
import { Link } from "react-router-dom";

export class NewsItem extends Component {
  render() {
    let { imgUrl, title, description } = this.props;
    return (
      <div className="h-full flex flex-col border border-[#ddd]">
        <div>
          <img src={imgUrl} alt="" className="w-full aspect-[10/6] object-cover" />
        </div>
        <div className="w-[80%] h-[1px] bg-[#ddd] mx-auto mt-4"></div>
        <div className="flex flex-col justify-between flex-grow p-3">
          <div className="mb-4">
            <h3 className="text-lg font-semibold leading-5 mb-3">{title}</h3>
            <p className="text-base ">{description}</p>
          </div>
          <Link to="" className="block w-fit ml-auto text-[#EE4736] font-medium hover:text-[#CB3C2E]">Read More &rarr;</Link>
        </div>
      </div>
    );
  }
}

export default NewsItem;
