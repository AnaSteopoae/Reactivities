using Application.Activities.DTOs;
using Application.Profiles.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Domain.Activity, Domain.Activity>();
        CreateMap<CreateActivityDTO, Domain.Activity>();
        CreateMap<EditActivityDto, Domain.Activity>();
        CreateMap<Domain.Activity, ActivityDTO>()
            .ForMember(dest => dest.HostDisplayName, opt => opt.MapFrom(src => src.Attendees.FirstOrDefault(x => x.IsHost)!.User.DisplayName))
            .ForMember(dest => dest.HostId, opt => opt.MapFrom(src => src.Attendees.FirstOrDefault(x => x.IsHost)!.User.Id));
        CreateMap<ActivityAttendee, UserProfile>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.User.Id))
            .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => src.User.DisplayName))
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.User.ImageUrl))
            .ForMember(dest => dest.Bio, opt => opt.MapFrom(src => src.User.Bio));
    }
}

