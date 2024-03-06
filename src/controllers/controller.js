import { password } from "../config.js";
import {pool} from "../db.js";

export const home=(req,res) => res.render('home',{title:'Home'})
export const login=(req,res) => res.render('login',{title:'Login'})
export const registro=(req,res) => res.render('registro',{title:'Registro'})
export const usuario = (req, res) => res.render('crud', { title: 'Usuarios' });

export const showUsers = async (req, res) => {
  try {
      const [users] = await pool.query('SELECT * FROM user');
      res.render('crud', { title: 'Usuarios', users }); // Asegúrate de incluir 'users' aquí
  } catch (error) {
      console.error("Error al obtener usuarios:", error);
      res.status(500).send("Error interno del servidor");
  }
};


export const insertUser = async (req, res) => {
    const { nameuser, password} = req.body;
    // console.log(await userExist(nameuser))
    const checkUser = await comprueba(nameuser);
 
    const query = "INSERT INTO user(nameuser,password) VALUES(?,?)";
     if(!checkUser){
      const [rows] = await pool.query(query, [nameuser, password]);
      res.send("Usuario creado con éxito")
     }
     else{
      res.send("El usuario ya existe")
     }
  }
  export const comprueba = async (nameuser) => {
    const query = "SELECT * FROM user WHERE nameuser = ?";
    
    try {
        const [existingUsers] = await pool.query(query, [nameuser]);
        return existingUsers.length > 0;
    } catch (error) {
        console.error("Error al verificar si el usuario existe:", error);
        // Si hay un error, se devuelve false por defecto
        return false;
    }
}



export const comprobarUser = async (req, res) => {
    const { nameuser, password } = req.body;
    const checkUserQuery = "SELECT * FROM user WHERE nameuser = ? AND password = ?";
    
    try {
        // Verificar si el usuario existe en la base de datos y coincide la contraseña
        const [existingUsers] = await pool.query(checkUserQuery, [nameuser, password]);

        if (existingUsers.length > 0) {
            // Si el usuario existe y la contraseña coincide, permitir el inicio de sesión
            res.send("Inicio de sesión exitoso");
        } else {
            // Si el usuario no existe o la contraseña no coincide, devolver un mensaje de error
            res.status(401).send("Usuario o contraseña incorrectos");
        }
    } catch (error) {
        // Manejar cualquier error que ocurra durante la consulta a la base de datos
        console.error("Error al intentar iniciar sesión:", error);
        res.status(500).send("Error interno del servidor");
    }
}





export const showCrud = async (req, res) => {
    try {
      const query = "SELECT * FROM userlogin.user";
      const [rows] = await conexion.query(query);
      console.log(rows);
      res.render("crud", { title: "User List", users: rows });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).send("Error fetching user");
    }
  };

  
  export const updateUser = async (req, res) => {
    try {
      const { id } = req.params; // Obtener el ID del usuario de los parámetros de la URL
      const { newName, newPassword } = req.body; // Obtener el nuevo nombre de usuario y la nueva contraseña del cuerpo de la solicitud

      // Verificar que los campos newName y newPassword no estén vacíos
      if (!newName || !newPassword) {
        return res.status(400).send("El nuevo nombre de usuario y la nueva contraseña son requeridos");
      }

      // Ejecutar la consulta SQL para actualizar el usuario en la base de datos
      await pool.query('UPDATE user SET nameuser = ?, password = ? WHERE id = ?', [newName, newPassword, id]);

      // Redireccionar a la página de usuarios después de actualizar
      res.redirect('/usuario');
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      res.status(500).send("Error interno del servidor");
    }
};

  
  export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM user WHERE id = ?', [id]);
      res.redirect('/usuario'); // Redirecciona a la página de usuarios después de eliminar
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      res.status(500).send("Error interno del servidor");
    }
  };



