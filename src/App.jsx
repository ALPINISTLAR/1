import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

const App = () => {
  const [items, setItems] = useState([
    { id: 'item-1', label1: 'Ustun nomi', label2: 'Key', placeholder1: 'Ustun nomi', placeholder2: 'Key', content1: '', content2: '', disabled1: false, disabled2: false },
    { id: 'item-2', label1: 'Ustun nomi', label2: 'Key', placeholder1: 'Ustun nomi', placeholder2: 'Key', content1: '', content2: '', disabled1: false, disabled2: false },
  ]);

  const handleInputChange = (e, id, field) => {
    const newValue = e.target.value;
    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === id) {
          return { ...item, [field]: newValue };
        }
        return item;
      });
    });
  };

  const handleSave = () => {
    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.content1) {
          console.log(item.content1);
          item.disabled1 = true;
        }
        if (item.content2) {
          console.log(item.content2);
          item.disabled2 = true;
        }
        return item;
      });
    });
  };

  const addNewItem = () => {
    const newItemId = `item-${items.length + 1}`;
    setItems([...items, { id: newItemId, label1: 'Ustun nomi', label2: 'Key', placeholder1: 'Ustun nomi', placeholder2: 'Key', content1: '', content2: '', disabled1: false, disabled2: false }]);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);
    setItems(reorderedItems);
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="droppable-container">
              <h2>Loyiha ketma-ketligi</h2>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="draggable-item">
                      <div className="input-group">
                        <label>{item.label1}</label>
                        <input
                          type="text"
                          placeholder={item.placeholder1}
                          value={item.content1}
                          onChange={(e) => handleInputChange(e, item.id, 'content1')}
                          disabled={item.disabled1}
                        />
                      </div>
                      <div className="input-group">
                        <label>{item.label2}</label>
                        <input
                          type="text"
                          placeholder={item.placeholder2}
                          value={item.content2}
                          onChange={(e) => handleInputChange(e, item.id, 'content2')}
                          disabled={item.disabled2}
                        />
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
