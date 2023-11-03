import { createServer, Model } from "miragejs";
import seedMockData from "./mockData";

function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    models: { pet: Model, order: Model },

    seeds(mockServer) {
      seedMockData(mockServer);
    },

    routes() {
      this.get('/api/v3/pet/findByStatus', (schema, request) => {
        const { status } = request.queryParams;
        return schema.db.pets.where({ status: status });
      });

      this.put("/api/v3/pet", function (schema, request) {
        let attrs = JSON.parse(request.requestBody);
        return schema.pets.find(attrs.id).update(attrs);
      })

      this.delete('/api/v3/pet:id', (schema, request) => {
        const { id } = request.params;
        return schema.pets.find(id).destroy();
      });

      this.get('/api/v3/user/login', () => {
        return new Response(200, { contentType: 'application/json' }, 'Logged in user session: 2617548970286185472');
      });

      this.get('/api/v3/user/logout', () => {
        return new Response(200, { contentType: 'application/json' }, 'User logged out');
      });

      this.get('/api/v3/store/inventory', (schema) => {
        const result = schema.orders.all();
        return result.models[0].attrs;
      });
    },
  });

  return server;
}

export default makeServer;