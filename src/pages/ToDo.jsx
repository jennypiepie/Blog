import React,{useState} from 'react'
import { DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd';
import mockData from '../assets/mockData'
import Dialog from '../components/Dialog';
import './less/ToDo.less'

export default function ToDo() {
  
  const [isShowDialog, setIsShowDialog] = useState(false);
  const toggleDialog = (section) => {
      console.log(section);
      // setIsShowDialog(true);
    }
    const closeDialog = () => {
        setIsShowDialog(false);
    }
    const onSure = () => {
        console.log('确定...');
        setTimeout(() => {
            setIsShowDialog(false);
        }, 2000);
    }
  
  
  const [data,setData] = useState(mockData)
  const dragEnd = (result) => {
    if (!result.destination) return
    const { source, destination } = result
    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = data.findIndex(e => e.id === source.droppableId)
      const destinationColIndex = data.findIndex(e => e.id === destination.droppableId)

      const sourceCol = data[sourceColIndex]
      const destinationCol = data[destinationColIndex]

      const sourceTask = [...sourceCol.tasks]
      const destinationTask = [...destinationCol.tasks]

      const [removed] = sourceTask.splice(source.index, 1)
      destinationTask.splice(destination.index, 0, removed)

      data[sourceColIndex].tasks = sourceTask
      data[destinationColIndex].tasks = destinationTask

    }else {
      const sourceColIndex = data.findIndex(e => e.id === source.droppableId)
      const sourceCol = data[sourceColIndex]
      const sourceTask = [...sourceCol.tasks]
      const [removed] = sourceTask.splice(source.index, 1)
      sourceTask.splice(destination.index, 0, removed)
      data[sourceColIndex].tasks = sourceTask
    }
    setData(data)
  }

  const addTask = (section) => {
    console.log(section);
  }


  return (
    <DragDropContext onDragEnd={(e)=>dragEnd(e)}>
      <div className="task-box">
        {
          data.map(section => (
            <Droppable droppableId={section.id} key={section.id}>
            {(provided, snapshot) => (
                <div className="task" ref={provided.innerRef} {...provided.droppableProps}>
                <div className="title">{section.title}</div>     
                {section.tasks.map((task, index) => (
                    <Draggable draggableId={task.id} index={index} key ={task.id}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        {// eslint-disable-next-line max-len
                          <div className="taskItem"
                            style={{ background: snapshot.isDragging ? "#e9ffff" : "lightgreen" }}>
                            {task.content}
                          </div>
                        }</div>
                    )}
                    </Draggable>
                ))}
                  {provided.placeholder}
                  <div className="button" onClick={() => {toggleDialog(section)}}>+</div>
                   {
                      isShowDialog
                      && <Dialog
                      title="这是标题"
                      dialogWidth='80%'
                      onCancle={closeDialog}
                      onOk={onSure}
                      cancelText="残忍离开"
                      sureText="我再想想"
                      >
                      <div className='dialog-content'>具体内容请写在这里...</div>
                    </Dialog>
                  }
                </div>
            )}
            </Droppable>
          ))
        }
      </div>
    </DragDropContext>
  )
}
