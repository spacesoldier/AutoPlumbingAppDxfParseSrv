# AutoPlumbingAppDxfParseSrv

This is the microservice whose only purpose is to parse DXF format into JSON structure so it can be comfortably used by other parts of the system

The service is built using [Starty](https://www.npmjs.com/package/starty) microframework which implements 
the idea of modulith (modular monolith) and the idea of "one-click-architecture" 
which means working only on essential logic without wasting time
on repeating the implementation of trivial stuff like REST requests handling

### Implemented service logic:
- receives DXF file as base64 encoded string (it's OK at the moment when the file size is relatively small)
- parses DXF using the dxf-parser JS library which is fully incorporated to the source code for compatibility (using require instead of exports/imports)
- returns JSON object which contains the structured information from DXF file