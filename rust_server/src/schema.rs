use juniper::{graphql_object, EmptyMutation, EmptySubscription, FieldResult, RootNode};

pub struct QueryRoot;

#[graphql_object]
impl QueryRoot {
    fn me(&self) -> FieldResult<&str> {
        Ok("Hello world")
    }
}

pub type Schema = RootNode<'static, QueryRoot, EmptyMutation, EmptySubscription>;

pub fn schema() -> Schema {
    Schema::new(QueryRoot, EmptyMutation::new(), EmptySubscription::new())
}
