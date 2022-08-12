import React, { Component } from "react";
import "./find.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { activityType } from "../../Components/filterData.js";
import { gender } from "../../Components/filterData.js";
import { price } from "../../Components/filterData.js";
import { maxCapacity } from "../../Components/filterData.js";
import FindCard from "../../Components/findActivity/findCard";
import SimpleMap from "../../Components/findMap/findMap";

const animatedComponents = makeAnimated();

class find extends Component {
  render() {
    return (
      <div className="find-background">
        <div className="activity-find">
          <div className="activity-wrapper">
            <FindCard />
          </div>
        </div>

        <div className="filter-find">
          <div className="filter-wrapper">
            <div className="filter-body">
              <div className="filter1">
                <Select
                  onChange={[]}
                  maxMenuHeight={"160px"}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  defaultValue={[]}
                  isMulti
                  options={activityType}
                  placeholder="Activity"
                />
              </div>

              <div className="filter2">
                <Select
                  maxMenuHeight={"160px"}
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  defaultValue={[]}
                  options={gender}
                  placeholder=" Gender"
                />
              </div>

              <div className="filter3">
                <Select
                  maxMenuHeight={"160px"}
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  defaultValue={[]}
                  options={price}
                  placeholder="Price"
                />
              </div>

              <div className="filter4">
                <Select
                  maxMenuHeight={"160px"}
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  defaultValue={[]}
                  options={maxCapacity}
                  placeholder="Participants"
                />
              </div>

              <div className="filtersExecute">
                <button
                  className="button btnFiltersExecute"
                  type="button"
                  name="btnFilterExecute"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="map-find">
          <div className="map-wrapper">
            <div className="map-body">
              <SimpleMap />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default find;
