# AutoPlumbingAppDxfParseSrv

This is the microservice whose only purpose is to parse DXF format into JSON structure so it can be comfortably used by other parts of the system

The service is built using [Starty](https://www.npmjs.com/package/starty) microframework which implements 
the idea of modulith (modular monolith) and the idea of "one-click-architecture" 
which means working only on essential logic without wasting time
on repeating the implementation of trivial stuff like REST requests handling
