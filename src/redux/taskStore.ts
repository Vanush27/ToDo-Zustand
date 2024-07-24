import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export type TTask = {
  id: number;
  title: string;
  description: string;
  isImportant: boolean;
  isCompleted: boolean;
  date: Date;
};

type TFormState = {
  title: string;
  description: string;
  isImportant: boolean;
  error: boolean;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setIsImportant: (isImportant: boolean) => void;
  setError: (error: boolean) => void;
};

type TTaskState = {
  todoNewList: TTask[] | [];
  currentEditedTodo: TTask | [];
  nextId: number;
  isEditedTodo: boolean;

  addTask: (task: TTask) => void;
  updateTask: (id: number, updatedTask: TTask) => void;
  deleteTask: (id: number) => void;
  setIsEditedTodo: (isEdited: boolean) => void;

  setCurrentEditedTodo: (task: TTask) => void;
  setTodoList: (task: TTask) => void;
};

export const useFormStore = create<TFormState>(set => ({
  title: '',
  description: '',
  isImportant: false,
  error: false,
  setTitle: title => set({title}),
  setDescription: description => set({description}),
  setIsImportant: isImportant => set({isImportant}),
  setError: error => set({error}),
}));

const toDoStore = (set: any, get: any): TTaskState => ({
  todoNewList: [],
  isEditedTodo: false,
  currentEditedTodo: [],
  nextId: 0,
  addTask: (task: TTask) =>
    set((state: any) => {
      const newTask = {...task, id: state.nextId};
      return {
        todoNewList: [...state.todoNewList, newTask],
        nextId: state.nextId + 1,
      };
    }),
  updateTask: (id: number, updatedTask: TTask) =>
    set((state: any) => ({
      todoNewList: state.todoNewList?.map((task: TTask) =>
        task.id === id ? {...updatedTask, ...task} : task,
      ),
    })),
  deleteTask: (id: number) =>
    set((state: any) => ({
      todoNewList: state.todoNewList.filter((task: TTask) => task.id !== id),
    })),
  setIsEditedTodo: (isEdited: boolean) =>
    set(() => ({
      isEditedTodo: isEdited,
    })),
  setCurrentEditedTodo: (task: TTask) =>
    set(() => ({
      currentEditedTodo: task,
    })),
  setTodoList: (task: TTask) =>
    set(() => ({
      todoNewList: task,
    })),
});

export const useTaskStore = create<any>(
  persist(toDoStore, {
    name: 'toDoStore',
  }),
);
