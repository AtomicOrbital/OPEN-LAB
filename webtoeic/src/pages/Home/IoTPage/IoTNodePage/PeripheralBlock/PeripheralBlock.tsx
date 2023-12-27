import { useState, useEffect, Fragment, useMemo } from 'react';
import { Card, Row, Col, Button, List, Pagination, AutoComplete } from 'antd';
import Header from '../../../../../components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../../../../redux/configStore';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { fetchAllBaiKhoiDieuKhien, searchBaiKhoiDieuKhien } from '../../../../../redux/ControllerBlockReducer/ControllerBlockReducer';
import { fetchAllBaiKhoiNgoaiVi, searchBaiKhoiNgoaiVi } from '../../../../../redux/PeripheralBlockReducer/PeripheralBlockReducer';
import Footer from '../../../../../components/Footer/Footer';

const PeripheralBlock = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch<DispatchType>();
    const data = useSelector((state: RootState) => state.PeripheralBlockReducer.items);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const searchResults = useSelector((state: RootState) => state.PeripheralBlockReducer.searchResult) as any;
    const itemsToDisplay = useMemo(() => {
        return searchTerm ? (searchResults.data || []) : currentItems;
    }, [searchTerm, searchResults, currentItems]);

    const totalItemsToDisplay = searchTerm ? (searchResults.data ? searchResults.data.length : 0) : data.length;
    // console.log("searchResults", searchResults);
    const debouncedSearch = debounce((term) => {
        if (term) {
            dispatch(searchBaiKhoiNgoaiVi(term));
        }
    }, 500)

    const handleSearch = (value: any) => {
        setSearchTerm(value);
        setCurrentPage(1);
        debouncedSearch(value);
    }

    const navigate = useNavigate();

    const handleDetailClick = (id: number) => {
        navigate(`/home/IoT/Node/peripheral_block/detailKhoiNgoaiVi?idKhoiNgoaiVi=${id}`);
    }

    // const totalItems = useSelector((state: RootState) => state.BaiIoTReducer.totalItems);
    // const itemsPerPage = useSelector((state: RootState) => state.BaiIoTReducer.itemsPerPage);
    // const currentPage = useSelector((state: RootState) => state.BaiIoTReducer.currentPage);

    // const handlePageChange = (page: number) => {
    //     dispatch(fetchBaiIoTPaginated({ page: page, size: itemsPerPage }));
    // };addCommentCamBien
    // useEffect(() => {
    //     dispatch(fetchBaiIoTPaginated({ page: 1, size: itemsPerPage }));
    // }, [dispatch, itemsPerPage]);

    useEffect(() => {
        dispatch(fetchAllBaiKhoiNgoaiVi());
    }, [dispatch]);

    return (
        <Fragment>
            <Header />
            <div className="container" style={{ marginTop: '150px' }}>
                <Row gutter={16}>
                    <Col span={18}>
                        <h4 className='text-center'>DANH SÁCH BÀI THỰC HÀNH IoT</h4>
                        <List
                            itemLayout="horizontal"
                            dataSource={Array.isArray(itemsToDisplay) ? itemsToDisplay : []}
                            renderItem={item => (
                                <Card style={{ width: '100%', marginTop: 16 }}>
                                    <Row align="middle" gutter={16}>
                                        <Col span={6}>
                                            <img src={item.anhNgoaiVi} alt={item.anhNgoaiVi} style={{ width: '100%' }} />
                                        </Col>
                                        <Col span={18}>
                                            <h5>{item.tenNgoaiVi}</h5>
                                            <Button onClick={() => handleDetailClick(item.ngoaiViId)}>
                                                Chi Tiết
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                            )}
                        />
                    </Col>
                    {/* Search Column */}
                    <Col span={6}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <h4>Tìm kiếm</h4>
                            <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                                <AutoComplete
                                    style={{ flex: 1 }}
                                    placeholder="Tìm kiếm bài IoT..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>
                    </Col>


                </Row>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '20px'
                    }}>
                    <Pagination
                        current={currentPage}
                        pageSize={itemsPerPage}
                        total={totalItemsToDisplay}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div >
            <Footer />
        </Fragment >
    );
}

export default PeripheralBlock;
