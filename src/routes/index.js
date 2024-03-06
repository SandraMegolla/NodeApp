//importo solo el enrutador desde el express
import { Router } from "express";
import { insertUser,comprobarUser,deleteUser,updateUser,showUsers } from "../controllers/controller.js";
//inicio enrutado y lo almaceno en una constante
const router = Router();
//Crear rutas
router.get("/",(req,res) => res.render('home',{title:'Home'}));
router.get("/login",(req,res) => res.render('login',{title:'Login'}))
router.get("/registro",(req,res) => res.render('registro',{title:'Registro'}))

router.get("/usuario", showUsers);



router.post('/insertUser',insertUser);  //registro
router.post('/comprobarUser',comprobarUser);  //login


router.post('/actualizar/:id', updateUser); // Ruta para actualizar usuario
router.post('/eliminar/:id', deleteUser); // Ruta para eliminar usuario
export default router;
