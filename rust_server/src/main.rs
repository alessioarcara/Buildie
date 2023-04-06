use std::net::TcpListener;

use rust_server::run;

#[tokio::main]
async fn main() -> std::io::Result<()> {
    run(TcpListener::bind("127.0.0.1:8000").expect("Failed to bind 8000 port"))?.await
}
