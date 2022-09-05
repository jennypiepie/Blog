import React,{useState} from 'react'
import { DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd';
import mockData from '../assets/mockData'
import Modal from '../components/Modal';
import './less/ToDo.less'

export default function ToDo() {
  
  const [isShowModal, setIsShowModal] = useState(false);
  const [title, setTitle] = useState();
  const toggleModal = (section) => {
      console.log(section);
      setIsShowModal(true);
      setTitle(section.title)
    }
    const closeModal = () => {
        setIsShowModal(false);
    }
    const onSure = () => {
        console.log('确定...');
        setTimeout(() => {
            setIsShowModal(false);
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


  return (
    <div>
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
                    <div className="button" onClick={() => {toggleModal(section)}}>+</div>

                  </div>
              )}
              </Droppable>
            ))
          }
        </div>
      </DragDropContext>
      {
        isShowModal&&<Modal
          title = {title}
          onCancel={closeModal}
          onOk={onSure}
          // cancelText="残忍离开"
          // sureText="我再想想"
        >
          <input style={{
            borderStyle: 'none',
            outline: 'none',
            width: '100%',
            height: '100%',
            background: 'lightgreen'
            }}>
          </input>
        </Modal>
      }
    </div>
  )
}
