import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Activity from "./Activity";
import ImageGallorie from "./ImageGallorie";
import PostContainer from "./PostContainer";
import "./tabcontainer.scss";
export default function TabContainer({ posts, username }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    console.log(index);
  }, []);
  return (
    <div className="tab-container">
      <Tabs defaultIndex={index} onSelect={(i) => setIndex(i)}>
        <TabList>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              borderBottom: "1px solid #d3d3d3",
            }}
          >
            <Tab className={index == 0 ? "tabHeader selected" : "tabHeader"}>
              <img src={require("../../../Assets/grid.png")} className="icon" />
            </Tab>
            <Tab className={index == 1 ? "tabHeader selected" : "tabHeader"}>
              <img src={require("../../../Assets/pen.png")} className="icon" />
            </Tab>
            <Tab className={index == 2 ? "tabHeader selected" : "tabHeader"}>
              <img
                src={require("../../../Assets/person.png")}
                className="icon"
              />
            </Tab>
          </div>
        </TabList>
        <TabPanel>
          <ImageGallorie />
        </TabPanel>
        <TabPanel>
          <PostContainer posts={posts}  />
        </TabPanel>
        <TabPanel>
          <Activity />
        </TabPanel>
      </Tabs>
    </div>
  );
}
