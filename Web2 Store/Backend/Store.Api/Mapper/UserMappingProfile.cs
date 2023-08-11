using AutoMapper;
using Store.Api.Request.UserRequest;
using Store.Api.Response.UserResponse;
using Store.Core.DTOs.UserDTOs;
using Store.Core.Models;

namespace Store.Api.Mapper
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile() 
        {
            CreateMap<LoginUserRequest, LoginUserDTO>();

            CreateMap<RegisterUserRequest, RegisterUserDTO>();
            CreateMap<RegisterUserDTO, User>()
                .ForMember(dest => dest.Password, opt => opt.Ignore())
                .ForMember(dest => dest.PasswordKey, opt => opt.Ignore());

            CreateMap<UpdateUserRequest, UpdatedUserDTO>();
            CreateMap<UpdatedUserDTO,User>()    
                .ForMember(dest => dest.Password, opt => opt.Ignore())
                .ForMember(dest => dest.PasswordKey, opt => opt.Ignore());
            CreateMap<User, GetSalesmansDTO>();
            CreateMap<User, GetUserDTO>();
            CreateMap<GetUserDTO, GetUserResponse>();
            CreateMap<GetSalesmansDTO, GetSalesmansResponse>();
        }
    }
}
