import styled from "styled-components";

// Styled Components
const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const NavButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  background: ${(props) => (props.active ? "#3498db" : "#ecf0f1")};
  color: ${(props) => (props.active ? "white" : "#2c3e50")};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => (props.active ? "#2980b9" : "#bdc3c7")};
  }
`;

const MainContent = styled.main`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const AddTaskForm = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const TaskInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #27ae60;
  }

  &:disabled {
    background: #95a5a6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  padding: 10px;
  background: #fadbd8;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const Loading = styled.div`
  text-align: center;
  padding: 20px;
  color: #7f8c8d;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #95a5a6;
  font-size: 18px;
`;

const TaskLists = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TaskItem = styled.li<{ completed: boolean }>`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
  background: ${(props) => (props.completed ? "#f8f9fa" : "white")};
  opacity: ${(props) => (props.completed ? 0.8 : 1)};

  &:last-child {
    border-bottom: none;
  }
`;

const Checkbox = styled.input`
  margin-right: 15px;
  cursor: pointer;
`;

const TaskTitle = styled.span<{ completed: boolean }>`
  flex: 1;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  color: ${(props) => (props.completed ? "#95a5a6" : "#2c3e50")};
`;

const TaskMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 15px;
`;

const PriorityBadge = styled.span<{ priority: "low" | "medium" | "high" }>`
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  background: ${(props) =>
    props.priority === "high"
      ? "#e74c3c"
      : props.priority === "medium"
      ? "#f39c12"
      : "#2ecc71"};
  color: white;
`;

const DueDate = styled.span`
  font-size: 12px;
  color: #7f8c8d;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 15px;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
`;

const EditButton = styled(Button)`
  background: #3498db;
  color: white;

  &:hover {
    background: #2980b9;
  }
`;

const DeleteButton = styled(Button)`
  background: #e74c3c;
  color: white;

  &:hover {
    background: #c0392b;
  }
`;

const EditForm = styled.div`
  display: flex;
  flex: 1;
  gap: 10px;
  align-items: center;
`;

const EditInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const PrioritySelect = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const DueDateInput = styled.input`
  padding: 7px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SaveButton = styled(Button)`
  background: #2ecc71;
  color: white;

  &:hover {
    background: #27ae60;
  }
`;

const CancelButton = styled(Button)`
  background: #95a5a6;
  color: white;

  &:hover {
    background: #7f8c8d;
  }
`;

const StatsView = styled.div`
  padding: 20px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 20px 0;
`;

const StatCard = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const StatNumber = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  color: #7f8c8d;
  font-size: 14px;
`;

const PriorityChart = styled.div`
  margin-top: 20px;
`;

const ChartBar = styled.div`
  margin-bottom: 10px;
`;

const ChartLabel = styled.div`
  margin-bottom: 5px;
  font-weight: bold;
  color: #2c3e50;
`;

const ChartBarInner = styled.div<{
  percentage: number;
  priority: string;
}>`
  height: 30px;
  width: ${(props) => props.percentage}%;
  background: ${(props) =>
    props.priority === "high"
      ? "#e74c3c"
      : props.priority === "medium"
      ? "#f39c12"
      : "#2ecc71"};
  color: white;
  display: flex;
  align-items: center;
  padding-left: 10px;
  border-radius: 4px;
  transition: width 0.5s ease;
`;

export {
  AppContainer,
  Header,
  Nav,
  NavButton,
  MainContent,
  AddTaskForm,
  TaskInput,
  AddButton,
  ErrorMessage,
  Loading,
  EmptyState,
  TaskLists,
  TaskItem,
  TaskTitle,
  DueDate,
  TaskActions,
  EditButton,
  DeleteButton,
  EditForm,
  EditInput,
  PrioritySelect,
  DueDateInput,
  SaveButton,
  CancelButton,
  StatsView,
  StatsGrid,
  StatCard,
  StatNumber,
  StatLabel,
  PriorityChart,
  ChartBar,
  ChartLabel,
  ChartBarInner,
  Checkbox,
  PriorityBadge,
  TaskMeta,
};