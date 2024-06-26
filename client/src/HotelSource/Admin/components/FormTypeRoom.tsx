// react-hook-form
import { useForm  , SubmitHandler, UseFormReturn} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
// MUI
import { Divider, Grid } from '@mui/material'
// hook
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import useEffectSkipFirstRender from '../../../hooks/useEffectSkipFirstRender';
//model
import { TypeAmenity, TypeObjAmenity, TypeRoom} from '../../../types/models';
//common
import InputHk2t from '../../../common/InputHk2t';
import ButtonHk2t from '../../../common/ButtonHk2t';
import CheckboxHk2t from '../../../common/CheckboxHk2t';
import RichTextEditorHk2t from '../../../common/RichTextEditor/RichTextEditorHk2t';
import RadioBtnHk2t from '../../../common/RadioBtnHk2t';
import UploadFileBtnHk2t from '../../../common/UploadFileBtnHk2t';
// util
import { uuid } from '../../../utils';
// constants
import { defaultViewDirection } from '../../../utils/constants';
import SliderImagesRoom from './SliderImagesRoom';
import { ActionForm } from '../../../types/form';

interface FormTypeRoomProps {
    selectedTypeRoom ?: TypeRoom;
    typesObjAmenity : TypeObjAmenity;
    typeActionForm : ActionForm;
    onActionTypeRoom : (values : TypeRoom) => void;
}

export interface FormTypeRoomHandle {
    form : UseFormReturn<TypeRoom>;
}

const FormTypeRoom = forwardRef<FormTypeRoomHandle , FormTypeRoomProps>((props , ref) => {
    const {selectedTypeRoom , typesObjAmenity , typeActionForm , onActionTypeRoom} = props;
    const formInnerRef = useRef<HTMLFormElement | null>(null);

    const schema = yup.object({
        title: yup.string()
                .required('Please enter title !'),
        size: yup.number()
                .required('Please enter size !'),
        preferential_services: yup.string()
                .required('Please enter text editor !'),
        view_direction: yup.number()
                .oneOf([1,2] as const)
                .required(),
        adult_capacity: yup.number()
                .required('Please enter capacity of adult !'),
        kids_capacity: yup.number()
                .required('Please enter capacity of kids !'),
        base_price: yup.number()
                .required('Please enter base price !'),
        amenities: yup.array()
                .of(yup.number())
                .required()
                .min(1, 'Must contain at least one amenity'),
        images: yup.array()
                .of(yup.string())
                .required()
                .min(1, 'Must contain at least one image'),
        status: yup.number()
                .oneOf([0,1] as const)
                .required()
    });

    const defaultValues : TypeRoom = {
        title : '',
        preferential_services : '',
        view_direction : 1,
        size : 0,
        adult_capacity : 0,
        kids_capacity : 0,
        base_price : 0,
        amenities : [],
        images : [],
        status : 0
    }

    // hook form
    const form : UseFormReturn<TypeRoom> = useForm({
        defaultValues,
        resolver: yupResolver(schema)
    }) as UseFormReturn<TypeRoom>

    // useImperativeHandle hook
    useImperativeHandle(ref , () => ({ form }))

    // use watch
    const uploadedImages = form.watch("images" , []);
    const selectedViewDirection = form.watch("view_direction" , 1);
    const selectedAmenities = form.watch("amenities" , []);
    const inputtedPreferentialServices = form.watch("preferential_services",'');

    // useMemo
    const keyWordForm = useMemo(() => {
        return typeActionForm === 'CREATE' ? 'create' : 'update'
    },[])

    // func change state form
    const handleChangeViewDirection = (value : TypeRoom['view_direction']) => {       
        form.setValue("view_direction", value);
    }
    
    const handleChangeCheckAmenity = (id : number) => {
        let currentSelectedAmenities = form.getValues("amenities");
        if(currentSelectedAmenities.includes(id)){
            currentSelectedAmenities = currentSelectedAmenities.filter(ameId => ameId != id)
        }else{
            currentSelectedAmenities.push(id);
        }
        form.setValue("amenities" , currentSelectedAmenities)
    }

    const handleChangePreferentialServices = (textEditor : string) => {
        form.setValue("preferential_services" , textEditor)
    }

    // useEffect
    useEffectSkipFirstRender(() => {
        if(form.formState.isSubmitSuccessful){
            form.reset(defaultValues)
        }
    },[form.formState.isSubmitSuccessful])

    useEffectSkipFirstRender(() => {
        if(typeActionForm === 'CREATE'){
            form.reset(defaultValues)
        }else{
            form.reset(selectedTypeRoom)
        }
    },[typeActionForm , selectedTypeRoom])

    return (
        <form 
            onSubmit={form.handleSubmit(onActionTypeRoom as SubmitHandler<TypeRoom>)}
            className='bl_personInfor_form'
            ref={formInnerRef}
        >
            <div className="bl_personInfor_form_inner">
                <div className="bl_personInfor_header">Form {keyWordForm} type room</div>
                <Divider className="bl_personInfor_divider"/>
                <div className="bl_personInfor_body">
                    <Grid container columnSpacing={3}>
                        <Grid item sm={6} container columnSpacing={3}>
                            <Grid item sm={11}>
                                <InputHk2t
                                    label='title' 
                                    name='title' 
                                    placeholder='title' 
                                    form={form} 
                                />
                            </Grid>
                            <Grid item sm={11}>
                                <InputHk2t 
                                    typeInput='number'
                                    label='size' 
                                    name='size' 
                                    placeholder='size' 
                                    form={form} 
                                />
                            </Grid>
                            <Grid item sm={11}>
                                <InputHk2t 
                                    typeInput='number'
                                    label='adult capacity' 
                                    name='adult_capacity' 
                                    placeholder='adult capacity' 
                                    form={form} 
                                />
                            </Grid>
                            <Grid item sm={11}>
                                <InputHk2t 
                                    label='kids capacity' 
                                    name='kids_capacity' 
                                    placeholder='kids capacity' 
                                    form={form} 
                                />
                            </Grid>
                            <Grid item sm={11}>
                                <InputHk2t 
                                    typeInput='number' 
                                    label='base price' 
                                    name='base_price' 
                                    placeholder='base price' 
                                    form={form} 
                                />
                            </Grid>
                            <Grid item sm={11} container spacing={3} alignItems={"center"} marginBottom={3}>
                                <Grid
                                    item
                                    sx={{
                                        color : "#707e9c;" , 
                                        fontWeight : "bold",
                                        marginRight : 4
                                    }}
                                >
                                    View direction
                                </Grid>
                                {defaultViewDirection.map((vd , index) => {
                                    const value = index + 1 as TypeRoom['view_direction']
                                    return (
                                        <Grid item>
                                            <RadioBtnHk2t
                                                id={`select-view-dir-${uuid()}`}
                                                name="view_direction"
                                                label={vd}
                                                value={value}
                                                checked={selectedViewDirection == value}
                                                form={form}
                                                onChange={() => handleChangeViewDirection(value)}
                                            />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Grid>
                        <Grid item sm={6} container rowSpacing={1}>
                            <Grid item sm={12} container>
                                <Grid
                                    item
                                    sx={{
                                        color : "#707e9c;" , 
                                        fontWeight : "bold",
                                        marginRight : 4
                                    }}
                                >
                                    Room images
                                </Grid>
                                <UploadFileBtnHk2t
                                    form={form}
                                    name="images"
                                />
                            </Grid>
                            <Grid item sm={12} style={{overflowX : 'auto'}}>
                                <SliderImagesRoom 
                                    imageLinks={uploadedImages}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container columnSpacing={3}>
                        <Grid item sm={6} container spacing={3}>
                            <Grid
                                item
                                sm={12}
                                sx={{
                                    color : "#707e9c;" , 
                                    fontWeight : "bold",
                                    marginRight : 4
                                }}
                            >
                                Amenities
                            </Grid>
                            {Object.keys(typesObjAmenity).map((key) => {
                                const keyTypeObjAmenity = key as TypeAmenity 
                                const amenities = typesObjAmenity[keyTypeObjAmenity]
                                return (
                                    <Grid item sm={11} container spacing={3}>
                                        <Grid item sm={3}>{key}</Grid>
                                        <Grid item sm={9} container spacing={3}>
                                            {amenities.map(ame => (
                                                <Grid item>
                                                    <CheckboxHk2t
                                                        id={`checkbox-amenity-by-type-${uuid()}`}
                                                        label={ame.name}
                                                        checked={selectedAmenities.includes(ame.id)}
                                                        onChange={() => handleChangeCheckAmenity(ame.id)}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                )
                            })}
                        </Grid>
                        <Grid item sm={6} container spacing={3}>
                            <Grid
                                item
                                sm={12}
                                sx={{
                                    color : "#707e9c;" , 
                                    fontWeight : "bold",
                                    marginRight : 4
                                }}
                            >
                                Text Editor
                            </Grid>
                            <Grid item sm={12}>
                                <RichTextEditorHk2t
                                    textEditor={inputtedPreferentialServices}
                                    onChangeTextEditor={handleChangePreferentialServices}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className="bl_btn__submit for_employee">
                <ButtonHk2t
                    variant="contained"
                    content={`${keyWordForm} type room`}
                    isUseForm={true}
                /> 
            </div>
        </form>
    )
})

export default FormTypeRoom
