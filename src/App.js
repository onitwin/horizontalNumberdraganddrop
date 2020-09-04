import React,{useState,useEffect} from 'react';
import {DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd'
import uuid from 'react-uuid'

const tiles=[
  {id:uuid(),content:'1'},
  {id:uuid(),content:'2'},
  {id:uuid(),content:'3'},
  {id:uuid(),content:'4'},
  {id:uuid(),content:'5'},
  {id:uuid(),content:'6'},
  {id:uuid(),content:'7'},
  {id:uuid(),content:'8'},
  {id:uuid(),content:'9'}
]


const listOfColumns={
  [uuid()]:{
    name:'Todo',
    items:tiles
  }
}


const onDragEnd=(result,columns,setColumns)=>{
  if(!result.destination) return;

  const {source,destination}=result;
  const column =columns[source.droppableId];
  const copiedItems=[...column.items];
  const [removed]=copiedItems.splice(source.index,1);
  copiedItems.splice(destination.index,0,removed);
  setColumns({
    ...columns,[source.droppableId]:{
      ...column,
      items:copiedItems
    }
  })
};




function App() {
  const [columns,setColumns]=useState(listOfColumns);

  return (
    <div style={{
    display:'flex',
    justifyContent:'center',
    height:'100%'}}>
      <p style={{color:'blue',fontSize:'10px'}}>Hello- this is a basic example of a horizontal drag and drop panel</p>

    <DragDropContext onDragEnd={result=>onDragEnd(result,columns,setColumns)}>
    {Object.entries(columns).map(([id,column])=>{
      return(
        <Droppable droppableId={id} key={id} direction="horizontal">
        {(provided,snapshot)=>{
          return (
            <div
            className="dropzone"
            {...provided.droppableProps}
            ref={provided.innerRef}
            >
            {column.items.map((item,index)=>{
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided,snapshot)=>{
                  return(
                    <div className='dragbox'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                    ...provided.draggableProps.style
                    }}
                    >
                    {item.content}
                    </div>
                  )
                }}
                </Draggable>
              )
            })}
            {provided.placeholder}
            </div>
          )
        }}
        </Droppable>
      )
    })}

    </DragDropContext>
    </div>
  )
}

export default App;
