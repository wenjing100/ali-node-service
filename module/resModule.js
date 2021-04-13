//用来设置返回的数据的形式

class baseModule {
    constructor( data, message ){
        if( typeof data === "string" ){
            this.message = data
            data = null
            message = null
        }
        if( data ){
            this.data = data
        }
        if( message ){
            this.message = message
        }
    }
}

class successModule extends baseModule{
    constructor( data, message ){
        super( data, message )
        this.errno = 0
    }
}
class errorModule extends baseModule{
    constructor( data, message ){
        super( data, message )
        this.errno = -1
    }
}

module.exports = {
    successModule,
    errorModule
}