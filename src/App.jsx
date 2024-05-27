import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

const App = () => {
  const [items, setItems] = useState([
    { id: 'item-1', label1: 'Ustun nomi', label2: 'Key', placeholder1: 'Ustun nomi', placeholder2: 'Key' },
    { id: 'item-2', label1: 'Ustun nomi', label2: 'Key', placeholder1: 'Ustun nomi', placeholder2: 'Key' },
  ]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, removed);

    setItems(reorderedItems);
  };

  const addNewItem = () => {
    const newItemId = `item-${items.length + 1}`;
    const newItemContent1 = 'Ustun nomi';
    const newItemContent2 = 'Key';
    const newItemPlaceholder1 = 'Ustun nomini';
    const newItemPlaceholder2 = 'Key';
    setItems([...items, { id: newItemId, label1: newItemContent1, label2: newItemContent2, placeholder1: newItemPlaceholder1, placeholder2: newItemPlaceholder2 }]);
  };

  const handleSave = () => {
    items.forEach(item => {
      console.log(item);
    });
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              className="droppable-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <h2>Loyiha ketma-ketligi</h2>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="draggable-item"
                      style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? 0.5 : 1 }}
                    >
                      <div className="input-group">
                        <label>{item.label1}</label>
                        <input type="text" placeholder={item.placeholder1} defaultValue={item.content1} />
                      </div>
                      <div className="input-group">
                        <label>{item.label2}</label>
                        <input type="text" placeholder={item.placeholder2} defaultValue={item.content2} />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <div className="btn-wrapper">
                <button onClick={addNewItem}>Ustun qo'shish</button>
                <button onClick={handleSave}>Saqlash</button>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;
