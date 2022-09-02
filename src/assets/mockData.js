import {v4 as uuidv4} from 'uuid'  

const mockData = [
    {
      id: uuidv4(),
      title: ' 📃 To do',
      tasks: [
        { id: uuidv4(), content: 'Take out the garbage' },
        { id: uuidv4(), content: 'Watch my favorite show' },
        { id: uuidv4(), content: 'Charge my phone' },
        { id: uuidv4(), content: 'Cook dinner' }
      ]
    },
    {
      id: uuidv4(),
      title: ' ✏️  In Progress',
      tasks: [
        { id: uuidv4(), content: 'Take out the garbage' },
        { id: uuidv4(), content: 'Watch my favorite show' },
        { id: uuidv4(), content: 'Charge my phone' }
      ]
    },
    {
      id: uuidv4(),
      title: ' ✔️ Completed',
      tasks: [
        { id: uuidv4(), content: 'Take out the garbage' },
        { id: uuidv4(), content: 'Watch my favorite show' },
      ]
    },
  ];
  
export default mockData