use actix_cors::Cors;
use actix_web::{
    get,
    dev::Server,
    web::{Data, Payload},
    App, HttpRequest, HttpResponse, HttpServer, route };
use juniper_actix::{graphql_handler, playground_handler};
use schema::{Schema, schema};
use std::net::TcpListener;

mod schema;

#[route("/graphql", method = "GET", method = "POST")]
async fn graphql(
    req: HttpRequest,
    payload: Payload,
    schema: Data<Schema>,
) -> Result<HttpResponse, actix_web::Error> {
    graphql_handler(&schema, &(), req, payload).await
}

#[get("/graphiql")]
async fn graphiql() -> Result<HttpResponse, actix_web::Error> {
    playground_handler("/graphql", None).await
}

pub fn run(listener: TcpListener) -> Result<Server, std::io::Error> {
    let server = HttpServer::new(|| {
        App::new()
            .app_data(Data::new(schema()))
            .service(graphiql)
            .service(graphql)
            .wrap(Cors::permissive())
    })
        .listen(listener)?
        .run();
    Ok(server)
}
