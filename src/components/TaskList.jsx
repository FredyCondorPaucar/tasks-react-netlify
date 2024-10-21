import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Global } from "../helpers/Global";

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const loadTasks = async () => {
    const res = await fetch(Global.url+"tasks/list");
    const data = await res.json();
    setTasks(data.tasks.reverse());
  };

  const handleDelete = async(id) => {
    await fetch(Global.url+"tasks/delete/"+id,{
      method:"DELETE"
    });    

    setTasks(tasks.filter(task => task.id !== id));
    
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <h1>Task List</h1>
      {tasks.map((task) => (
        <Card
          key={task.id}
          style={{
            marginBottom: ".7rem",
            backgroundColor: "#1e272e",
          }}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "60%",
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              <Typography style={{ color: "white", fontSize: "24px" }}>
                {task.title}
              </Typography>
              <Typography style={{ color: "white" }}>
                {task.description}
              </Typography>
            </div>

            <div style={{ width: "40%", display: "flex" }}>
              <Button
                variant="contained"
                color="inherit"
                style={{ marginRight: "5px" }}
                onClick={() => navigate(`/tasks/${task.id}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
