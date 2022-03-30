/* eslint-disable no-lone-blocks */
/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
/* eslint-disable array-callback-return */
/* eslint-disable linebreak-style */
import React, {useState, useEffect} from 'react';
import {
  Col,
  Container,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import axios from 'axios';
import Photo from './Photo';

export default function Photos() {
  const [photos, setPhotos] = useState([]);
  const [album, setAlbum] = useState([]);
  const [loading, setLoading] = useState(false);
  const [albumNo, setAlbumNo] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(100);
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/albums')
      .then((response) => {
        console.log(response.data);
        setAlbum(response.data);
      })
      .catch((error) => {
        console.log('An error occurred:', error.response);
      });
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/${albumNo}/photos`)
      .then((response) => {
        console.log(response.data);
        setPhotos(response.data);
      })
      .catch((error) => {
        console.log('An error occurred:', error.response);
      });
    setLoading(false);
  }, [albumNo]);
  return (
    <div>
      <Container className="w-100 my-3">
        <Row className="w-100 mx-auto">
          {photos.map((val) => {
            return (
              <Col lg="3" md="4">
                <Photo
                  AlbumId={val.albumId}
                  Id={val.id}
                  Thumbnail={val.thumbnailUrl}
                  Title={val.title}
                  Url={val.url}
                  loading={loading}
                />
              </Col>
            );
          })}
        </Row>
        <Pagination>
          {album.map((val) => {
            return (
              <PaginationItem>
                <PaginationLink onClick={() => setAlbumNo(val.id)} href="#">
                  {val.id}
                </PaginationLink>
              </PaginationItem>
            );
          })}
        </Pagination>
      </Container>
    </div>
  );
}
