create database orm;

create table test_user (
    id        serial primary key,
    firstname text,
    lastname  text
);

insert into test_user (firstname, lastname) values
    ('jackson', 'pollock'),
    ('sylvia', 'plath'),
    ('daenerys', 'targaryen');
