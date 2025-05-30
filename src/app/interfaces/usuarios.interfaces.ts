export interface Login{
    email:string;
    pass:string;
}

export interface RespuestaLogin{
    status: string;
    messages: string;
    data:{
         id: number,
        nombres: string,
        apellidos: string,
        nro_documento: number;
        correo: string,
        id_rol: number,
        estado: number,
        registrado: number,
        created_at: Date,
        updated_at: Date,
        deleted_at: any,
    }
}

export interface Register{
    email:any;
    password:any;
    emailRepetir:any;
    passwordRepetir:any;
}
