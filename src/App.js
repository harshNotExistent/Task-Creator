import React,{Component,ReactDOM} from 'react';
import {Row,Col,Card,CardBody,FormGroup,Label,Input,Form,CardHeader,Button,ListGroup,ListGroupItem} from 'reactstrap';
import TimePicker from 'react-time-picker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
let taskList=[];
 class App extends Component {
  constructor(props){
    super(props);
    this.state={
      task:{
        name:'',
        description:'',
        startDate:new Date(),
        time: '10:00',
        date:new Date()
      },
      taskDisplay:[],
      toggler:true,
      
    }

    this.handleDate=this.handleDate.bind(this);
    this.handleTime=this.handleTime.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleAll=this.handleAll.bind(this);
    this.handleUpcoming=this.handleUpcoming.bind(this);
  }

componentWillMount(){
  taskList=JSON.parse(localStorage.getItem('TaskList'))==null?[]:JSON.parse(localStorage.getItem('TaskList'));
  
  taskList.sort(function(a,b){
    return new Date(a.startDate)-new Date(b.startDate);
  })

  this.setState({
    taskDisplay:taskList.slice(0,3)
  })
}
handleAll(){
  taskList=JSON.parse(localStorage.getItem('TaskList'));
  taskList.sort(function(a,b){
    return new Date(a.startDate)-new Date(b.startDate);
  });
  this.setState({
    toggler:false,
    taskDisplay:taskList
  })
}
handleUpcoming(){
  taskList=JSON.parse(localStorage.getItem('TaskList'))==null?[]:JSON.parse(localStorage.getItem('TaskList'));
  
  taskList.sort(function(a,b){
    return new Date(a.startDate)-new Date(b.startDate);
  })
  console.log('displa');
  this.setState({
    toggler:true,
    taskDisplay:taskList.slice(0,3)
  })
}
  handleChange(event){

    const {name,value}=event.target;
    const {task}=this.state;
    this.setState({
      task:{
      ...task,
      [name]:value
      }
    });

  }
  handleTime(time){
    const {task}=this.state;
    this.setState({
      task:{
      ...task , 
      time: time
      }
    });
  }
  handleDate(date) {
    const {task}=this.state;
    var month=date.getMonth()+1;
    var date1=date.getDate()+'-'+month+'-'+ date.getFullYear();
    console.log(date1);
    this.setState({
      task:{
        ...task,
      startDate: date
      }
    });
  }
  handleSubmit(){
  
    var newDate= new Date(this.state.task.startDate);

    var newtime=this.state.task.time.split(":");
    newDate.setHours(newtime[0]);
    newDate.setMinutes(newtime[1]);

    var task=this.state.task
    task={
      ...task,
      startDate:newDate
    }
    console.log('task',task);
    taskList=JSON.parse(localStorage.getItem('TaskList'))==null?[]:JSON.parse(localStorage.getItem('TaskList'));
    taskList.push(task);
    taskList.sort(function(a,b){
      return new Date(a.startDate)-new Date(b.startDate);
    })
   
    if(this.state.toggler==true){
      var toDisplay=taskList.slice(0,3);
      console.log('New data',taskList);
      this.setState({
        taskDisplay:toDisplay
      });
    }
    else{
    this.setState({
      taskDisplay:taskList
    });
  }
  
    localStorage.setItem('TaskList',JSON.stringify(taskList));
  }
   render(){
     const {task}=this.state;
     console.log(taskList);
  return (
    <div>
    <div style={{float:"left", width:"70%" ,border:"1px solid  black" }} >

        <Card style={{minHeight:'100vh'}}>
        <div style={{paddingTop:"5%"}}>
        <h3 style={{textAlign:"center"}} >Task Creator</h3>
        </div>
          <CardBody style={{padding:"10.25rem"}}>
         
         <Form>
         <Row>
             <Col>
           <FormGroup>

             <Label htmlFor="taskName">Task Name</Label>
              <Input id="taskName" name="name" size="16" type="text" value={task.name} onChange={this.handleChange} placeholder="Task Name" >
            </Input>
           </FormGroup>
           </Col>
           </Row>
           <FormGroup>
           <Label htmlFor="taskDesc">Task Description</Label>
              <Input id="taskDesc" name="description" size="16" type="text" value={task.description} onChange={this.handleChange} placeholder="Task Description" >
            </Input>
           </FormGroup>
         
           <table>
             <tbody>
         <tr><td style={{textAlign:"center",border:"1px solid  #ced4da"}}>Select Date</td>


           <td style={{textAlign:"center",border:"1px solid  #ced4da"}}>Select Time</td></tr>
        <tr><td>
            <DatePicker
            minDate={this.state.task.date}
        selected={this.state.task.startDate}
        onChange={this.handleDate}
        dateFormat="dd/MM/YYYY"
        isOpen={false}
      />
            </td>
           <td>
           <TimePicker
          onChange={this.handleTime}
          value={this.state.task.time}
          isOpen={false}
        />
        </td>
        </tr>
        </tbody>
           </table>
       
           </Form>
           <Row>
             <Col sm={{size:12,offset:7}}>
            <div style={{float:"left" ,width:"20%"}}>
                <Input type="submit" value="Create Task" onClick={this.handleSubmit}></Input>
              </div> 
              </Col>
              </Row>   
          </CardBody>
        </Card>

 
    </div>
      <div  style={{border:"1px solid black"}}>
      <Card style={{minHeight:'100vh',height: "100px",overflowY:"auto"}}>
        <CardHeader>
          <Button style={{textAlign:"center"}} onClick={this.handleUpcoming}>
            Upcoming
          </Button>
          <Button style={{textAlign:"center",float:"right"}} onClick={this.handleAll}>
            All
          </Button>
          </CardHeader>

          <CardBody>
            {
              this.state.taskDisplay.length>0 ?
          <ListGroup>
            {this.state.taskDisplay.map((e,i)=>{
            return <ListGroupItem key={i}><div style={{float:"left"}}>{e.name}</div><div style={{float:"right"}}> {e.time}</div></ListGroupItem>})}
            </ListGroup>: 'No Task Registered'}
          </CardBody>
      </Card>

    </div >
    </div> 
  );
   }
}

export default App;
