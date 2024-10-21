import {
  Card,
  Typography,
  Grid,
  CardContent,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Global } from "../helpers/Global";

export const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [nameButton, setNameButton] = useState("CREATE");

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(editing){
      const res = await fetch(Global.url+'tasks/update/'+params.id, {
        method: "PUT",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await res.json();
      if (data.task) {
        setLoading(false);
      }

    }else{
      const res = await fetch(Global.url+"tasks/create", {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await res.json();
      if (data.task) {
        setLoading(false);
      }
    }  

    navigate("/");
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const loadTask = async (id) => {
    const res = await fetch(Global.url+'tasks/task/'+id);
    const data = await res.json();
    setTask({title: data.task.title, description: data.task.description});
    setEditing(true);
    setNameButton("UPDATE");    
  };

  useEffect(() => {
    if (params.id) {
      loadTask(params.id)
    }else {
      // Si no hay `id`, significa que es una nueva tarea, limpiar el formulario
      setTask({ title: "", description: "" });
      setEditing(false);
      setNameButton("CREATE");
    }
  }, [params.id]);

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{
            backgroundColor: "#1e272e",
            padding: "1rem",
          }}          
        >
          <Typography variant="5" textAlign="center" color="white">
            {editing?"Edit Task":"Create Task"}          
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                name="title"
                value={task.title}
                variant="filled"
                label="Write your title"
                fullWidth
                sx={{ display: "block", margin: ".5rem 0" }}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "#4590e0" } }}
                onChange={handleChange}
              />
              <TextField
                name="description"
                value={task.description}
                variant="filled"
                label="Write your description"
                fullWidth
                multiline
                rows={4}
                sx={{ display: "block", margin: ".5rem 0" }}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "#4590e0" } }}
                onChange={handleChange}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!task.title || !task.description}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  nameButton
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
