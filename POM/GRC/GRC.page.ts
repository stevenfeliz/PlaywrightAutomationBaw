import { type Locator, type Page, type FrameLocator, test, expect } from '@playwright/test';


export class GRCPage {
    readonly page: Page;
    readonly iframe: () => FrameLocator;
    readonly GRCElements: {
        getButtonComentarios: () => Locator,
        getinputComentarios: () => Locator,
        getGuardarComentarios: () => Locator,
        getRegresarComentarios: () => Locator,
        getAvanzar: () => Locator,
        getIdInstancia: ()=> Locator
    };
    readonly tasksElements: {
        crearSolicitud: {
            getTipoDePersonaNatural: () => Locator,
            getTipoRescateProgramado: () => Locator,
            getTipoRescateNoProgramado: () => Locator,
            getTotalCancelado: () => Locator,
            getParcial: () => Locator,
            getTipoIdentificacion: () => Locator,
            getNumeroTelefono: () => Locator,
            getCorreo: () => Locator,
            getNumeroEncargo: () => Locator,
            getNumeroFondo: () => Locator,
            getNumeroTipoCuenta: () => Locator,
            getBanco: () => Locator,
            getNumeroCuenta: () => Locator,
            getPrioridad: () => Locator,
            getNumeroIdentificacion: () => Locator,
            getButtonConsultar: () => Locator,
            getNombreAportante: () => Locator,
            getRepresentanteLegal: () => Locator
        }
    }


    constructor(page: Page) {
        this.page = page
        this.iframe = () => page.frameLocator('.cshsTaskWindow').frameLocator('#coach_div iframe'),
            this.GRCElements = {
                getIdInstancia: ()=> this.iframe().getByLabel('Id Instancia'),
                getButtonComentarios: () => this.iframe().locator('button[id="button-button-CV_Generales1:Button2"]'),
                getinputComentarios: () => this.iframe().locator('textarea[id="textarea-textarea-Text_area1"]'),
                getGuardarComentarios: () => this.iframe().locator('button[id="button-button-Button1"]'),
                getRegresarComentarios: () => this.iframe().locator('button[id="button-button-Button2"]'),
                getAvanzar: () => this.iframe().locator('button[id="button-button-CV_Acciones1:Button3"]')
            }
        this.tasksElements = {
            crearSolicitud: {
                getRepresentanteLegal: () => this.iframe().getByLabel('Representante Legal'),
                getTipoDePersonaNatural: () => this.iframe().locator('input[id="radiogroup-item-input-CV_Generales1:Check_box1[0]"]'),
                getTipoRescateNoProgramado: () => this.iframe().locator('input[id="radiogroup-item-input-CV_Generales1:Check_box3[1]"]'),
                getTipoRescateProgramado: () => this.iframe().locator('input[id="radiogroup-item-input-CV_Generales1:Check_box3[0]"]'),
                getTotalCancelado: () => this.iframe().locator('input[id="radiogroup-item-label-CV_Generales1:Checkbox1[0]"]'),
                getCorreo: () => this.iframe().locator('input[id="text-input-Datos_Generales_Cliente1:Plain_text3"]'),
                getNumeroCuenta: () => this.iframe().getByLabel('Número de Cuenta'),
                getNumeroEncargo: () => this.iframe().getByLabel('Número de Encargo'),
                getNumeroFondo: () => this.iframe().locator('select[id="singleselect-detalleInversion1:Text3"]'),
                getPrioridad: () => this.iframe().getByLabel('Prioridad'),
                getNumeroTelefono: () => this.iframe().locator('input[id="text-input-Datos_Generales_Cliente1:Plain_text1"]'),
                getNumeroTipoCuenta: () => this.iframe().locator('select[id="singleselect-detalleInversion1:Single_Select1"]'),
                getParcial: () => this.iframe().locator('input[id="radiogroup-item-input-CV_Generales1:Checkbox1[1]"]'),
                getTipoIdentificacion: () => this.iframe().locator('select[id="singleselect-Datos_Generales_Cliente1:Single_select1"]'),
                getBanco: () => this.iframe().locator('input[id="text-input-detalleInversion1:Text6"]'),
                getNumeroIdentificacion: () => this.iframe().locator('input[id="text-input-Datos_Generales_Cliente1:Plain_text2"]'),
                getButtonConsultar: () => this.iframe().locator('button[id="button-button-Datos_Generales_Cliente1:Button1"]'),
                getNombreAportante: () => this.iframe().locator('input[id="text-input-Datos_Generales_Cliente1:Plain_text4"]')
            }
        }
    };

    async consultarDatosPersona(tipoID: string, dato: string) {

        await this.tasksElements.crearSolicitud.getTipoIdentificacion().selectOption(tipoID)
        await this.tasksElements.crearSolicitud.getNumeroIdentificacion().fill(dato)
        await this.tasksElements.crearSolicitud.getButtonConsultar().click()
        await this.iframe().locator('img[alt="Loading"]').waitFor({ state: 'attached', timeout: 50000 })
        await this.iframe().locator('img[alt="Loading"]').waitFor({ state: 'hidden', timeout: 50000 })

        const valueDatoCliente = await this.tasksElements.crearSolicitud.getNombreAportante().inputValue()

        return valueDatoCliente
    };



    async flujoCrearSolicitud() {
        await this.tasksElements.crearSolicitud.getTipoDePersonaNatural().check()
        await this.tasksElements.crearSolicitud.getTipoRescateNoProgramado().check()
        await this.tasksElements.crearSolicitud.getParcial().check()
        await this.tasksElements.crearSolicitud.getTipoDePersonaNatural().check()
        await this.GRCElements.getButtonComentarios().click()
        await this.GRCElements.getinputComentarios().fill('prueba')
        await this.GRCElements.getGuardarComentarios().click()

        const valueInput = await this.iframe().locator('.outerTable table tbody tr input[id="text-input-Table1:Display_text4[0]"]').inputValue()
        expect(valueInput).toContain('prueba')

        await this.GRCElements.getRegresarComentarios().click()
        await this.consultarDatosPersona('RNC', '00101180230')

        await this.tasksElements.crearSolicitud.getNumeroTelefono().fill('8987678987')
        await this.tasksElements.crearSolicitud.getCorreo().fill('admin@test.com')
        await this.tasksElements.crearSolicitud.getRepresentanteLegal().fill('U16240')
        await this.tasksElements.crearSolicitud.getNumeroEncargo().fill('test')
        await this.tasksElements.crearSolicitud.getNumeroFondo().selectOption('FIA Liquidez')
        await this.tasksElements.crearSolicitud.getNumeroTipoCuenta().selectOption('Ahorro')
        await this.tasksElements.crearSolicitud.getBanco().fill('test')
        await this.tasksElements.crearSolicitud.getNumeroCuenta().fill('123')
        await this.tasksElements.crearSolicitud.getPrioridad().selectOption('Baja')

        const InstanceID = await this.GRCElements.getIdInstancia().textContent()
        
        if(InstanceID){
            if(parseInt(InstanceID)) return parseInt(InstanceID)

        }
  

    }
}

