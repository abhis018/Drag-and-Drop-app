import React, { Component } from 'react';
import './DragandDrop.css';


class DragandDrop extends Component {
    constructor(){
        super ()
        this.state = {
            tasks: [
              {id: "1", taskName:"Item #1",type:"inProgress"},
              {id: "2", taskName:"Item #2", type:"inProgress"},
              {id: "3", taskName:"Item #3", type:"inProgress"},
              {id: "4", taskName:"Item #4", type:"inProgress"},
              {id: "5", taskName:"Item #5", type:"Done"},
              {id: "6", taskName:"Item #6", type:"Done"},
              {id: "7", taskName:"Item #7", type:"Done"},
              {id: "8", taskName:"Item #8", type:"Done"},
              {id: "9", taskName:"Item #9", type:"Working"},
              {id: "10", taskName:"Item #10", type:"Working"},
              {id: "11", taskName:"Item #11", type:"Working"},
              {id: "12", taskName:"Item #12", type:"Working"},
            ]
        }
    }

    onDragStart = (event, taskName) => {
    	console.log('dragstart on div: ', taskName);
    	event.dataTransfer.setData("taskName", taskName);
	}
	onDragOver = (event) => {
	    event.preventDefault();
	}

	onDrop = (event, file) => {
	    let taskName = event.dataTransfer.getData("taskName");

	    let tasks = this.state.tasks.filter((task) => {
	        if (task.taskName === taskName) {
	            task.type = file;
	        }
	        return task;
	    });

	    this.setState({
	        ...this.state,
	        tasks
	    });
	}
    render(){
        var tasks = {
            inProgress: [],
            Done: [],
            Working: [],
        }
        this.state.tasks.forEach ((task) => {
            tasks[task.type].push(
              <div
                onDragStart = {(event) => this.onDragStart(event, task.taskName)}
                draggable
                className="draggable"
                >
                {task.taskName}
              </div>
            );
          });
        return(
            <div className="drag-container">
                <div className="container">
                    <div className="group-header group2">Done</div>
                    <div className="group-header group3">Working</div>
                    <div className="group-header group1">To do</div>
                </div>
                <div className="container">
                    <div className="droppable"
                        onDragOver={(event)=>this.onDragOver(event)}
                        onDrop={(event)=>this.onDrop(event, "Done")}>
                        
                        {tasks.Done}
                    </div>
                    <div className="Working"
                        onDragOver={(event)=>this.onDragOver(event)}
                        onDrop={(event)=>this.onDrop(event, "Working")}>
                        
                        {tasks.Working}
                    </div>
                    <div className="Progress"
                        onDragOver={(event)=>this.onDragOver(event)}
                        onDrop={(event)=>{this.onDrop(event, "inProgress")}}>
                        {tasks.inProgress}
                    </div>
                </div>
            </div>
        )
    }
}

export default DragandDrop;